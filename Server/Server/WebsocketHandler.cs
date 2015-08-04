using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

using Fleck;
using GameFramework.Core;

namespace WebsocketHandler
{
    public class WebsocketHandler
    {
        private static Server gameServer = new Server();
        
        static void Main()
        {
            FleckLog.Level = LogLevel.Debug;
            var allSockets = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://0.0.0.0:8181");

            server.Start(socket =>
                {
                    socket.OnOpen = () =>
                        {
                            Console.WriteLine("Open!");
                            allSockets.Add(socket);
                        };
                    socket.OnClose = () =>
                        {
                            Console.WriteLine("Close!");
                            allSockets.Remove(socket);
                        };
                    socket.OnMessage = message =>
                        {
                            Console.WriteLine(message);
                            
                            // process the message
                            gameServer.MessageBroker.ProcessMessage(message);

                            allSockets.ToList().ForEach(s => s.Send("Echo: "));
                        };
                });

            var input = Console.ReadLine();
            while (input != "exit")
            {
                input = Console.ReadLine();
            }
        }
    }
}

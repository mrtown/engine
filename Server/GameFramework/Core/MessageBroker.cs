using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Reflection;
using Microsoft.CSharp.RuntimeBinder;


            //var x = new {action = "buySomething", parameters = new Dictionary<string, string>()};
            //x.parameters.Add("playerRecipient", "Jana");
            //string serial = _serializer.Serialize(x);
            //Console.WriteLine(serial);

            //var y = _serializer.Deserialize<dynamic>(serial);

            //string asdf = y["action"];
            //string blah = y["parameters"]["playerRecipient"];


namespace GameFramework.Core
{
    public class MessageBroker
    {
        private Server _server;
        private static JavaScriptSerializer _serializer = new JavaScriptSerializer();
        
        public MessageBroker(Server server)
        {
            _server = server;
        }

        public dynamic ProcessMessage(string data)
        {            
            try
            {
                var message = _serializer.Deserialize<dynamic>(data);

                if (message["action"] == "START_GAME")
                    CreateGame(message);
                else
                {
                    AbstractGame game = _server.Games.Where(g => g.Id == message["gameId"]).First<AbstractGame>();
                    game.State = game.State.ProcessMessage(message);
                    return game.SecuredGameState();
                }
            }
            catch (Exception ex)
            {
                // do something - 
            }

            // fix this
            return null;

        }

        private void CreateGame(dynamic message)
        {
            // dynamically loadd assembly containing an imp[lementation of AbstractGame
            Assembly assembly = Assembly.LoadFrom("..\\..\\..\\StrategyRPG\\bin\\debug\\StrategyRPG.dll");
            Type type = assembly.GetType("StrategyRPG.Game");
            var game = Activator.CreateInstance(type);

            

        }

    }
}

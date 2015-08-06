using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GameFramework.Core
{
    public class Server
    {
        public List<AbstractGame> Games { get; private set; }
        public MessageBroker MessageBroker { get; private set; }

        public Server()
        {
            MessageBroker = new MessageBroker(this);   
        }
    }
}

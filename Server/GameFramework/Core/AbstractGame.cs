using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GameFramework.Core
{
    public class AbstractGame
    {
        public Guid Id { get; private set; }
        public AbstractState State { get; private set; }
        
        public dynamic processMessage(dynamic message)
        {

            return BuildStateMessage();
        }

        private dynamic BuildStateMessage()
        {
            return null;
        }
    }
}

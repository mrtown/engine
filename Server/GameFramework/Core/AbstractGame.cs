using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GameFramework.Core
{
    public abstract class AbstractGame
    {
        public Guid Id { get; protected set; }
        public AbstractState State { get; set; }
        public List<AbstractPlayer> Players { get; set; }
        public abstract dynamic SecuredGameState();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GameFramework.Core
{
    public abstract class AbstractState
    {
        public AbstractGame Game { get; set; }
        public abstract AbstractState ProcessMessage(dynamic message);

        public AbstractState(AbstractGame game)
        {
            Game = game;
        }
    }
}

﻿using GStop_API.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GStop.DTOs.DTOs.GameDTOs
{
    public class UserCommentDTO
    {
        public string Username { get; set; }
        public int GameId { get; set; }
        public string Content { get; set; }
 
    }
}

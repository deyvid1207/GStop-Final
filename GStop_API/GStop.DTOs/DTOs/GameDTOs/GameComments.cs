using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GStop.DTOs.DTOs.GameDTOs
{
    public class GameComments
    {
        public int GameId { get; set; }
        public const int CommentPerPage = 7;
        public int Page { get; set; }
        public int Pages { get; set; }
        public List<UserCommentDTO> comments;

        public GameComments()
        {
                comments = new List<UserCommentDTO>();
        }
    }
}

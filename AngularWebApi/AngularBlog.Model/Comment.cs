using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularBlog.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public int IdAuthor { get; set; }
        public string Content { get; set; }
        public int IdPost { get; set; }

    }
}

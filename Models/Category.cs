using System;
using System.Collections.Generic;

namespace moody.Models
{
    public partial class Category
    {
        public Category()
        {
            Tag = new HashSet<Tag>();
        }

        public int TagCode { get; set; }
        public string TagName { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }

        //public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Tag> Tag { get; set; }
    }
}

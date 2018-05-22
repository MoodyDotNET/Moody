using System;
using System.Collections.Generic;

namespace moody.Model
{
    public partial class Producer
    {
        public Producer()
        {
            Artist = new HashSet<Artist>();
        }

        public int ProducerCode { get; set; }
        public string CompanyName { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public bool Available { get; set; }
        public DateTime? LastModifyAt { get; set; }
        public int? LastModifyBy { get; set; }

        public Administrator LastModifyByNavigation { get; set; }
        public ICollection<Artist> Artist { get; set; }
    }
}

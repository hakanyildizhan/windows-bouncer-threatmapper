using IpData.Models;

namespace LiteDBExtractor
{
    public class ProcessedRecord
    {
        public string Ip { get; set; }
        public string Country { get; set; }
        public double? Latitude { get; set; }
        public double? Longtitude { get; set; }
        public IpInfo IpInfo { get; set; }
        public string Login { get; set; }
        public DateTime Date { get; set; }
    }
}

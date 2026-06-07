import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.6d96yo7.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);
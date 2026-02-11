const extremeContent = [
  "murder",
  "homicide",
  "assassinate",
  "torture",
  "suicide",
  "genocide",
  "terrorism",
  "massacre",
  "bloodshed",
  "decapitate",
  "explosives",
  "firearms",
  "trafficking",
  "smuggling",
  "narcotics",
  "extremist",
  "radicalize",
  "pornography",
  "hateful",
  "harassment",
  "kill",
];

const contentGuard = (req, res, next) => {
  const { title, content } = req.body;
  const combindContent = `${title} ${content}`;
  const pattern = new RegExp(`\\b(${extremeContent.join("|")})\\b`, "i");
  console.log(pattern)
  if (pattern.test(combindContent)) {
    req.isFlagged = true;
    console.log("⚠️ Extreme content detected!");
  } else {
    req.isFlagged = false;
  }
  next();
};

module.exports = contentGuard;

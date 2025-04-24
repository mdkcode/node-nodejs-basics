const parseEnv = () => {
  const rss = Object.entries(process.env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(rss);
};

parseEnv();

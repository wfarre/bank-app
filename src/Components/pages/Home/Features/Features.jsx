import chatIcon from "./icon-chat.png";
import moneyIcon from "./icon-money.png";
import securityIcon from "./icon-security.png";

function Features() {
  const featuresData = [
    {
      title: "You are our #1 priority",
      content:
        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
      img: chatIcon,
      imgTitle: "chat icon",
    },
    {
      title: "More savings means higher rates",
      content:
        "The more you save with us, the higher your interest rate will be!",
      img: moneyIcon,
      imgTitle: "money icon",
    },
    {
      title: "Security you can trust",
      content:
        "We use top of the line encryption to make sure your data and money is always safe.",
      img: securityIcon,
      imgTitle: "security icon",
    },
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {featuresData.map((data) => {
        return (
          <div className="feature-item" key={data.imgTitle}>
            <img src={data.img} alt={data.imgTitle} className="feature-icon" />
            <h3 className="feature-item-title">{data.title}</h3>
            <p>{data.content}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Features;

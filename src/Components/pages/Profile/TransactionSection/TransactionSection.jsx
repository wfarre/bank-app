import { formateNumber } from "../../../../utils/formateNumber";

function TransactionSection() {
  const bankAccountData = [
    {
      accountTitle: "Argent Bank Checking (x8349)",
      accountAmount: 2082.79,
      description: "Available Balance",
    },
    {
      accountTitle: "Argent Bank Savings (x6712)",
      accountAmount: 10928.42,
      description: "Available Balance",
    },
    {
      accountTitle: "Argent Bank Credit Card (x8349)",
      accountAmount: 184.3,
      description: "Current Balance",
    },
  ];

  return (
    <section className="section section--transaction">
      <header className="section__header">
        <h2 className="sr-only">Accounts</h2>
      </header>
      <div className="section__content">
        {bankAccountData.map((data, key = 0) => {
          key++;
          return (
            <div key={key} className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">{data.accountTitle}</h3>
                <p className="account-amount">
                  ${formateNumber(data.accountAmount)}
                </p>
                <p className="account-amount-description">{data.description}</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TransactionSection;

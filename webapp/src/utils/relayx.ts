import axios from "axios";

export async function getTokenBalance(params: {origin: string, paymail: string}): Promise<{balance: number}> {

    let balance = 0

    const { data } = await axios.get(
      `https://staging-backend.relayx.com/api/token/${params.origin}/owners`
    );

    console.log(data)

    const [owner] = data.data.owners.filter((owner: {paymail: string, amount:number}) => {
      return owner.paymail === params.paymail;
    });

    if (owner?.amount) {

      balance = owner.amount

    }

    return { balance }
  }
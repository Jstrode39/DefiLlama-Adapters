const { getTokenBalance } = require('../helper/solana')
const { fetchURL } = require('../helper/utils')

const IPLR_MINT = 'EyzgnBfHGe9hh169B8993muBVcoeURCnSgPbddBeSybo'
const SOL_MINT = 'So11111111111111111111111111111111111111112'
const LP_ACCOUNT = 'GpMZbSM2GgvTKHJirzeGfMFoaZ8UR2X7F4v8vHTvxFbL'

async function tvl() {
  const [iplrBalance, solBalance] = await Promise.all([
    getTokenBalance(IPLR_MINT, LP_ACCOUNT),
    getTokenBalance(SOL_MINT, LP_ACCOUNT),
  ])

  const solPriceData = await fetchURL('https://coins.llama.fi/prices/current/solana:So11111111111111111111111111111111111111112')
  const solPrice = solPriceData.data.coins['solana:So11111111111111111111111111111111111111112'].price

  const solValueUSD = solBalance * solPrice
  const estimatedTVL = solValueUSD * 2

  return {
    tether: estimatedTVL
  }
}

module.exports = {
  timetravel: false,
  misrepresentedTokens: true,
  methodology: 'Estimates TVL from the IPLR/SOL LP vault on Solana using real token balances and current SOL price.',
  solana: {
    tvl,
  }
}

const { getTokenBalance } = require('../helper/solana')

const SOL_MINT = 'So11111111111111111111111111111111111111112'
const IPLR_MINT = 'EyzgnBfHGe9hh169B8993muBVcoeURCnSgPbddBeSybo'
const REWARDS_WALLET = 'EftM2RPnZqLMc3UpE7Xjz41DdtAopYziCmB4r1wVAJ9C'

async function staking() {
  const [solBalance, iplrBalance] = await Promise.all([
    getTokenBalance(SOL_MINT, REWARDS_WALLET),
    getTokenBalance(IPLR_MINT, REWARDS_WALLET),
  ])

  return {
    'solana:So11111111111111111111111111111111111111112': solBalance,
    'solana:EyzgnBfHGe9hh169B8993muBVcoeURCnSgPbddBeSybo': iplrBalance
  }
}

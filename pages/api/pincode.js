import pincodes from '../../pincodes.json'


export default function handler(red ,res ){

 res.status(200).json(pincodes)
}


import {get} from './request'

export function getBanner() {
   return get('/banner?type=0')
}
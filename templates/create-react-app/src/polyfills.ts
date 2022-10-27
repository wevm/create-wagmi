import { Buffer } from 'buffer'

if (!window.Buffer) {
  window.Buffer = Buffer
}

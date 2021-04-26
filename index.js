import log from './utils/logger'

import app from './app'
import  './database'

app.listen(4000)
log.info('Listening in Port 4000', 4000)
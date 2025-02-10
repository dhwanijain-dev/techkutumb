//// filepath: /D:/HTML/tldraw/frontend/src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createClient } from '@liveblocks/client'
import { LiveblocksProvider } from '@liveblocks/react'
import './index.css'
import App from './App.jsx'
import { DraggableCore } from 'react-draggable'

// const client = createClient({ publicApiKey: 'pk_dev_SpTzi9z907zeY' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiveblocksProvider publicApiKey="pk_dev_SpTzi9z907zeYA4c5cNnRwPeolv6bPpd_X3qslBMgMnj9Aad7ovVZD4ruOG7ATLs">
     
      <App />
    </LiveblocksProvider>
  </StrictMode>,
)
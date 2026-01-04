#!/bin/bash
cd client-next && npm run dev &
cd .. & cd backend && npm start &
wait
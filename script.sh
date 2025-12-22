#!/bin/bash
cd admin && npm run admin &
cd .. & cd backend && npm start &
wait
#!/usr/bin/env bash
near call $CONTRACT commentOnTour '{"comment": { "tourId": "ID-1655110327981726020", "comment":"Not Bad"} }' --accountId $OWNER

#!/usr/bin/env bash
near call $CONTRACT commentOnTour '{"comment": {"id": "ABC111666", "tourId": "056NNNNN76", "comment":"Not Bad"} }' --accountId $OWNER

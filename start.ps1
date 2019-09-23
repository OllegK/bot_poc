docker run --cap-add=NET_ADMIN -it -e ID='bot1' -e WINDSCRIBE_LOGIN='IndividualBroDeveloper' -e WINDSCRIBE_PASSWORD='bPFk7fTae7Ps' -v c:/apps/bot_poc/output:/usr/src/app/output -v c:/apps/bot_poc/app/src:/usr/src/app/app/src olegk/bot_poc_wind2

Read-Host -Prompt "Press Enter to exit"
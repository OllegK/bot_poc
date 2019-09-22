#!/usr/bin/expect -f

set login [lindex $argv 0];
set pass [lindex $argv 1];

spawn windscribe login

expect "Windscribe Username:"
send -- $login\r

expect "Windscribe Password:"
send -- $pass\r

interact

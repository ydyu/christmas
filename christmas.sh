#!/bin/bash
function print_tree {
	declare -A colors
	colors=(
		[red]="\033[0;31m"
		[green]="\033[0;32m"
		[blue]="\033[0;34m"
        [brown]="\033[0;33m"
        [yellow]="\033[1;33m"
		[purple]="\033[0;35m"
		[cyan]="\033[0;36m"
		[white]="\033[0;37m"
		[default]="\033[0m"
	)

  # print the tree
	local i j k rand
	for ((i=0; i<$1; i++)); do
		for ((j=$1-i; j>0; j--)); do
			echo -n " "
		done
        # if top of the tree, print the star
        if [ $i -eq 0 ]; then
            echo -e -n ${colors[yellow]}
            echo "*"
            continue
        fi
		for ((k=0; k<2*i+1; k++)); do
            # decorate the tree with some ornaments
            rand=$((RANDOM%5))
            if [ $rand -lt 2 ]; then
                color=${colors[green]}
            elif [ $rand -lt 3 ]; then
                color=${colors[cyan]}
            elif [ $rand -lt 4 ]; then
                color=${colors[red]}
            else
                color=${colors[white]}
            fi
            echo -n -e $color
    		echo -n "*"
		done
        echo
	done
  # print the trunk
    color=${colors[brown]}
    echo -n -e $color
	for ((i=0; i<2; i++)); do
		for ((j=0; j<$1-1; j++)); do
			echo -n " "
		done
		echo "| |"
	done
    echo -e ${colors[default]}
}

# default tree height is 10
# if second argument is a number do animation
if [ -n "$2" ]; then
    clear
    tput civis
    for ((i=1; i<=$2; i++)); do
        tput home
        print_tree ${1:-10}
        sleep 0.08
    done
    tput cnorm
else
#otherwise, print the tree
    print_tree ${1:-10}
fi

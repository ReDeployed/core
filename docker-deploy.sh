#!/usr/bin/env bash

# "bash strict mode"
set -uo pipefail

# modified version of https://askubuntu.com/a/1386907
chooseMenu() {
    local prompt="$1" outvar="$2"
    shift
    shift
    local options=("$@") cur=0 count=${#options[@]} index=0
    local esc=$(echo -en "\e")
    scriptFeedback prompt "$prompt"
    while true
    do
        index=0
        for o in "${options[@]}"
        do
            if [ "$index" == "$cur" ]
            then echo -e "> \e[1m\e[92m$o\e[0m"
            else echo -e "  \e[90m$o\e[0m"
            fi
            index=$(( $index + 1 ))
        done
        read -s -n3 key
        if [[ $key == "$esc[A" ]]
        then cur=$(( $cur - 1 ))
            [ "$cur" -lt 0 ] && cur=0
        elif [[ $key == "$esc[B" ]]
        then cur=$(( $cur + 1 ))
            [ "$cur" -ge $count ] && cur=$(( $count - 1 ))
        elif [[ $key == "" ]]
        then break
        fi
        echo -en "\e[${count}A"
    done
    printf -v $outvar "${options[$cur]}"
}

# give user feedback
scriptFeedback() {
    case $1 in
        prompt)
            printf "[\e[1m\e[9%sm%s\e[0m]%s\n" "3" "?" " $2" 
            ;;
        error)
            printf "[\e[1m\e[9%sm%s\e[0m]%s\n" "1" "✗" " $2"
            exit 1
            ;;
        success)
            printf "[\e[1m\e[9%sm%s\e[0m]%s\n" "2" "✓" " $2" 
            ;;
        proc)
            printf "[\e[1m\e[9%sm%s\e[0m]%s\n" "3" ":" " $2"
            ;;
    esac
}

dockerSetup() {
    # build images
    docker build -t re-surreal:latest ./surreal-src/
    docker build -t re-astro:latest ./astro-src/

    # run astro and surreal
    docker run --name astro --restart unless-stopped -d -p 127.0.0.1:8080:8085 re-astro
    docker run --name surreal --restart unless-stopped -d -p 127.0.0.1:8000:8000 re-surreal
}

selections=(
    "no"
    "yes"
)
chooseMenu "This script will deploy surrealdb and astro docker containers, continue?" \
selected_choice ${selections[@]}
if [ "$selected_choice" == "yes" ]; then
    if ! command -v docker >> /dev/null; then
        scriptFeedback error "Docker not installed!"
    fi
    dockerSetup
    if [ $? -eq 0 ]; then
        docker ps
        scriptFeedback success "Installed Successfully!"
    else
        scriptFeedback error "Error during Installation!"
    fi
else
    scriptFeedback error "Exiting.."
fi

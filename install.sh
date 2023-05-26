#! /bin/bash

# constants
REPO_URL="https://github.com/ReDeployed/core"
RUN_DIR="$PWD"
DEP_INSTALL=0

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
            if [ "$index" == "$cur" ]; then
                echo -e "> \e[1m\e[92m$o\e[0m\e[3m\e[0m"
            else
                echo -e "  \e[90m$o\e[3m\e[0m"
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
            printf "[\e[1m\e[9%sm%s\e[0m]%s\n" "3" "+" " $2"
            ;;
    esac
}

showBanner() {
    echo """
 ____      ____             _             
|  _ \ ___|  _ \  ___ _ __ | | ___  _   _ 
| |_) / _ \ | | |/ _ \ '_ \| |/ _ \| | | |
|  _ <  __/ |_| |  __/ |_) | | (_) | |_| |
|_| \_\___|____/ \___| .__/|_|\___/ \__, |
                     |_|            |___/ 

$RUN_DIR/install.sh
Installer Script v0.0.1
"""
}

checkDeps() {
    # docker
    if command -v /bin/docker >> /dev/null; then
        IS_ACTIVE="$(systemctl --user is-active docker)"
        scriptFeedback proc "docker found and $IS_ACTIVE!"
        if command -v /bin/docker-compose >> /dev/null; then
            scriptFeedback proc "docker-compose found!"
        else
            scriptFeedback proc "docker-compose not installed!"
            if $DEP_INSTALL; then
                scriptFeedback proc "Installing..."
                /bin/apt install docker-compose -y
            else
                scriptFeedback error "missing dependencies!"
            fi
        fi
    else
        scriptFeedback proc "docker not installed!"
        if $DEP_INSTALL; then
            scriptFeedback proc "Installing..."
            /bin/apt install docker -y
        else
            scriptFeedback error "missing dependencies!"
        fi
    fi
    # git
    if command -v /bin/git >> /dev/null; then
        scriptFeedback proc "git found!"
    else
        scriptFeedback proc "git not installed!"
        if $DEP_INSTALL; then
            scriptFeedback proc "Installing..."
            /bin/apt install git -y
        else
            scriptFeedback error "missing dependencies!"
        fi
    fi
}

prepareEnv() {
    # make dir
    $SUS_SYS mkdir -p /opt/reDeploy
    cd /opt/redeploy
    # clone repo
    /bin/git clone "$REPO_URL"
    cd echo $(echo $REPO_URL | rev | cut -d '/' -f 1 | rev)
    # go back
    cd $RUN_DIR
}

doDocker() {
    # enable services
    scriptFeedback proc "Setting up docker..."
    /bin/systemctl enable docker
    /bin/systemctl start docker
    # docker compose things
    /bin/docker-compose up -d --build --pull "always"
}

# detect su system
if command -v /bin/sudo >> /dev/null; then
    SU_SYS="/bin/sudo"
else
    SU_SYS="/bin/doas"
fi

# preperation
showBanner
scriptFeedback proc "$(echo $SU_SYS | rev | cut -d '/' -f 1 | rev) detected!"

# dependencies
selections=(
    "no"
    "yes"
)
chooseMenu "Install missing things automatically?" selected_choice ${selections[@]}

# proceed accordingly
case $selected_choice in
    "yes")
        DEP_INSTALL=1
        /bin/apt update
        ;;
    "no")
        DEP_INSTALL=0
        ;;
esac

checkDeps

# start selection here
selections=(
    "no"
    "yes"
)
chooseMenu "Proceed with install?" selected_choice ${selections[@]}

# proceed accordingly
case $selected_choice in
    "yes")
        scriptFeedback proc "Starting..."
        prepareEnv
        doDocker
        ;;
    "no")
        exit 0
        ;;
esac

scriptFeedback success "All Done!"
exit 0

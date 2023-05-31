#! /bin/bash

# constants
REPO_URL="https://github.com/ReDeployed/core"
RUN_DIR="$PWD"
DEP_INSTALL=false

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
    else
        scriptFeedback proc "docker not installed!"
        if $DEP_INSTALL; then
            scriptFeedback proc "Installing..."
            $SU_SYS /bin/apt install docker.io -y  > /dev/null 2>&1
        else
            scriptFeedback error "missing dependencies!"
        fi
    fi
    # docker-compose
    if command -v /bin/docker-compose >> /dev/null; then
            scriptFeedback proc "docker-compose found!"
        else
            scriptFeedback proc "docker-compose not installed!"
            if $DEP_INSTALL; then
                scriptFeedback proc "Installing..."
                $SU_SYS /bin/apt install docker-compose -y  > /dev/null 2>&1
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
            $SU_SYS /bin/apt install git -y  > /dev/null 2>&1
        else
            scriptFeedback error "missing dependencies!"
        fi
    fi
}

prepareEnv() {
    scriptFeedback proc "Creating App Folder..."
    # make dir
    $SU_SYS mkdir -p /opt/reDeploy
    $SU_SYS rm -rf /opt/reDeploy/*
    cd /opt/reDeploy
    # clone repo
    $SU_SYS /bin/git clone "$REPO_URL" > /dev/null 2>&1
}

doSSL() {
    scriptFeedback proc "Creating SSL certificate..."
    cd "/opt/reDeploy/core/proxy/ssl"
    # create a new self signed cert
    $SU_SYS /bin/openssl req -x509 \
        -nodes -days 365 \
        -newkey rsa:2048 \
        -keyout server.key \
        -out server.crt \
        -subj "/CN=redeploy.local" \
    > /dev/null 2>&1
}

doDocker() {
    # go to dir
    cd "/opt/reDeploy/core/proxy/ssl"
    # enable services
    scriptFeedback proc "Setting up docker..."
    $SU_SYS /bin/systemctl enable docker
    $SU_SYS /bin/systemctl start docker
    # docker compose things
    scriptFeedback proc "Building docker stack..."
    $SU_SYS /bin/docker-compose up -d --build > /dev/null 2>&1
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
        DEP_INSTALL=true
        scriptFeedback proc "Updating Package Repos..."
        $SU_SYS /bin/apt update > /dev/null 2>&1
        ;;
    "no")
        DEP_INSTALL=false
        ;;
esac

# check deps
checkDeps
# recheck if we installed
if $DEP_INSTALL; then
    checkDeps
fi

# proceed with main install
scriptFeedback proc "Starting..."
prepareEnv
doSSL
doDocker

# done
scriptFeedback success "All Done!"
exit 0
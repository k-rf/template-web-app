FROM node:16-bullseye

ARG REMOTE_USER
ARG REMOTE_WORKSPACES
ARG REMOTE_HOME

ENV PATH=$PATH:${REMOTE_HOME}/.yarn/bin

RUN userdel -r node && useradd -m ${REMOTE_USER} -u 1000 -s /bin/bash

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir -p /commandhistory ${REMOTE_HOME}/.vscode-server/extensions ${REMOTE_WORKSPACES}/node_modules \
    && touch /commandhistory/.bash_history \
    && chown -R ${REMOTE_USER}:${REMOTE_USER} /commandhistory ${REMOTE_HOME}/.vscode-server ${REMOTE_WORKSPACES}/node_modules \
    && echo ${SNIPPET} >> "${REMOTE_HOME}/.bashrc"

RUN sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- --yes \
    && echo 'eval "$(starship init bash)"' >> ${REMOTE_HOME}/.bashrc

USER ${REMOTE_USER}
RUN mkdir -p ${REMOTE_HOME}/.config \
    && { \
    echo '[time]'; \
    echo 'disabled = false'; \
    echo 'utc_time_offset = "9"'; \
    echo 'format = "🕘 [$time]($style) "'; \
    echo ''; \
    echo '[container]'; \
    echo 'format = "[$symbol]($style) "'; \
    echo ''; \
    echo '[nodejs]'; \
    echo 'format = "via [⚡ $version](bold green) "'; \
    } >> ${REMOTE_HOME}/.config/starship.toml

RUN yarn global add zx

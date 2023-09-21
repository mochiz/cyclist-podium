#!/bin/bash
# docker公式のRailsサンプルから
# @see https://matsuand.github.io/docs.docker.jp.onthefly/samples/rails/
set -e

# Rails に対応したファイル server.pid が存在しているかもしれないので削除する。
rm -f /myapp/tmp/pids/server.pid

# コンテナーのプロセスを実行する。（Dockerfile 内の CMD に設定されているもの。）
exec "$@"
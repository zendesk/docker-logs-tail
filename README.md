# Docker Logs Tail

Docker Logs Tail simultaneously tails logs for all running Docker containers, interleaving them in the command line output.

Requires node v6.0.0 or later.

## Installation

```
npm install -g docker-logs-tail
```

## Usage

Type `dlt` to see the last 10 lines of logs, with new logs entries being displayed as they occur:

```
dlt
```

You can specify the number of previous lines to show with the `-n` option:

```
dlt -n 100
```

```
dlt -n 0
```

Terminal colors in the output can be disabled with `--no-color`:

```
dlt --no-color
```

Docker container names can be optionally excluded or specifically included. Matching is case-insensitive and supports wildcard:

```
# Include "registrator" and anything starting with "consul":
dlt --include 'registrator,consul*'

# Exclude anything with "sql" in the name, including differently cased "MySQL":
dlt --exclude '*sql*'
```

## Copyright and license

Copyright 2016 Zendesk, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.


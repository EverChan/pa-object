TESTS =  $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = tap
TIMEOUT = 3000
MOCHA_OPTS =
REGISTRY = --registry=http://registry.npm.taobao.org

start:
	@node-dev --harmony dispatch.js

install:
	@npm install $(REGISTRY) \
		--disturl=http://dist.cnpmjs.org

clean:
	@rm -rf node_modules
	@rm -rf coverage

autod:
	@./node_modules/.bin/autod $(REGISTRY) -w -e coverage,views,static
	@$(MAKE) install


run:
   @nohup node —-harmony app.js &


kill
  @killall node
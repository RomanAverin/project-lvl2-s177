install:
	npm install
usage:
	node bin/gendiff.js --help
run:
	node bin/gendiff.js
test-run:
	node bin/gendiff.js -f json __tests__/__fixtures__/befor.json __tests__/__fixtures__/after.json
publish:
	npm publish
lint:
	npm run eslint .
watch:
	npm run test -- --watch
test:
	npm test


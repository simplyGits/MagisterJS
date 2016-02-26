Array.isArray ?= (x) ->
	Object.prototype.toString.call x is '[object Array]'

String::trim ?= ->
	if @length > 0 then @replace /^\s+|\s+$/g, ''
	else ''

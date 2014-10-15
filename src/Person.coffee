###*
# A Person.
#
# @class Person
# @private
# @param _magisterObj {Magister} A Magister object this Person is child of.
# @param _type {Number|String} The type of the Person.
# @param _firstName {String} The first name of the Person.
# @param _lastName {String} The last name of the Person.
# @constructor
###
class @Person
	constructor: (@_magisterObj, @_type, @_firstName, @_lastName) ->
		if @_firstName? and @_lastName?
			throw new Error "One or more arguments is not a string." if _.any _.toArray(arguments)[2..], (a) -> a? and not _.isString a

		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property type
		# @type String
		###
		@type = _getset "_type", ((val) => @_type = Person._convertType(val, yes)), Person._convertType
		###*
		# @property firstName
		# @final
		# @type String
		###
		@firstName = _getset "_firstName"
		###*
		# @property lastName
		# @final
		# @type String
		###
		@lastName = _getset "_lastName"
		###*
		# @property namePrefix
		# @final
		# @type String
		###
		@namePrefix = _getset "_namePrefix"
		###*
		# @property fullName
		# @final
		# @type String
		###
		@fullName = _getset "_fullName"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description"
		###*
		# @property group
		# @final
		# @type String
		###
		@group = _getset "_group"
		###*
		# @property teacherCode
		# @final
		# @type String
		###
		@teacherCode = _getset "_teacherCode"
		###*
		# @property emailAddress
		# @final
		# @type String
		###
		@emailAddress = _getset "_emailAddress"

	_toMagisterStyle: ->
		obj = {}

		obj.Id = @_id
		obj.Type = @_type
		obj.Voornaam = @_firstName
		obj.Achternaam = @_lastName
		obj.Tussenvoegsel = @_namePrefix
		obj.Naam = @_fullName
		obj.Omschrijving = @_description
		obj.Groep = @_group
		obj.Docentcode = @_teacherCode
		obj.Emailadres = @_emailAddress

		return obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new Person magisterObj, raw.Type, raw.Voornaam, raw.Achternaam

		obj._id = raw.Id
		obj._namePrefix = raw.Tussenvoegsel
		obj._fullName = raw.Naam
		obj._description = raw.Omschrijving ? raw.Naam
		obj._group = raw.Groep
		obj._teacherCode = raw.Docentcode
		obj._emailAddress = raw.Emailadres

		return obj

	@_convertType: (original, setter = yes) ->
		if setter
			if _.isNumber original
				throw new Error "Invalid value: \"#{original}\"." unless _.contains [1, 3, 4, 8], original
				return original

			else
				switch original.toLowerCase()
					when "group" then 1
					when "teacher" then 3
					when "pupil" then 4
					when "project" then 8

					else throw new Error "Invalid value: \"#{original}\"."
		
		else
			switch original
				when 1 then "group"
				when 3 then "teacher"
				when 4 then "pupil"
				when 8 then "project"
				
				else undefined
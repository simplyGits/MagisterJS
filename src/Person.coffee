root = (module?.exports ? this.Magister ?= {})

###*
# A Person.
#
# @class Person
# @private
# @param _magisterObj {Magister} A Magister object this Person is child of.
# @param _firstName {String} The first name of the Person.
# @param _lastName {String} The last name of the Person.
# @constructor
###
class root.Person
	constructor: (@_magisterObj, @_firstName, @_lastName) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property type
		# @type String
		###
		@type = root._getset "_type", ((val) => @_type = Person._convertType(val, yes)), Person._convertType
		###*
		# @property firstName
		# @final
		# @type String
		###
		@firstName = root._getset "_firstName"
		###*
		# @property lastName
		# @final
		# @type String
		###
		@lastName = root._getset "_lastName"
		###*
		# @property namePrefix
		# @final
		# @type String
		###
		@namePrefix = root._getset "_namePrefix"
		###*
		# @property fullName
		# @final
		# @type String
		###
		@fullName = root._getset "_fullName"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = root._getset "_description"
		###*
		# @property group
		# @final
		# @type String
		###
		@group = root._getset "_group"
		###*
		# @property teacherCode
		# @final
		# @type String
		###
		@teacherCode = root._getset "_teacherCode"
		###*
		# @property emailAddress
		# @final
		# @type String
		###
		@emailAddress = root._getset "_emailAddress"

	_toMagisterStyle: ->
		obj = {}

		obj.Id = @_id
		obj.Type = (
			if @_type is 4 then 3
			else @_type
		)
		obj.Voornaam = @_firstName
		obj.Achternaam = @_lastName
		obj.Tussenvoegsel = @_namePrefix
		obj.Naam = @_fullName
		obj.Omschrijving = @_description
		obj.Groep = @_group
		obj.Docentcode = @_teacherCode
		obj.Emailadres = @_emailAddress

		obj

	@_convertRaw: (magisterObj, raw, type) ->
		obj = new root.Person magisterObj, raw.Voornaam, raw.Achternaam

		obj._id = raw.Id
		obj._namePrefix = raw.Tussenvoegsel
		obj._fullName = raw.Naam
		obj._description = raw.Omschrijving ? raw.Naam ? raw.naam
		obj._group = raw.Groep
		obj._teacherCode = raw.Docentcode
		obj._emailAddress = raw.Emailadres
		obj._type = type ? raw.Type

		obj

	@_convertType: (original, setter = yes) ->
		if setter
			if _.isNumber original
				throw new Error "Invalid value: '#{original}'." unless original in [1, 3, 4, 8]
				original

			else
				switch original.toLowerCase()
					when 'group' then 1
					when 'study' then 2
					when 'person', 'teacher', 'personnel', 'pupil' then 3
					when 'location' then 6
					when 'project' then 8

					else throw new Error "Invalid value: \"#{original}\"."

		else
			switch original
				when 1 then 'group'
				when 2 then 'study'
				when 3 then 'person'
				when 6 then 'location'
				when 8 then 'project'

				else 'unknown'

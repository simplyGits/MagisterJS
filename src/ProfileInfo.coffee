###*
# Information of the logged in user. Or a child.
#
# @class ProfileInfo
# @private
# @param _magisterObj {Magister} A Magister object this ProfileInfo is child of.
# @param _firstName {String} The first name of the user.
# @param _lastName {String} The last name of the user.
# @param _birthDate {Date} The date of birth of the user.
# @constructor
###
class @ProfileInfo
	constructor: (@_magisterObj, @_firstName, @_lastName, @_birthDate) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property officialFirstNames
		# @final
		# @type String
		###
		@officialFirstNames = _getset "_officialFirstNames"
		###*
		# @property initials
		# @final
		# @type String
		###
		@initials = _getset "_initials"
		###*
		# @property namePrefix
		# @final
		# @type String
		###
		@namePrefix = _getset "_namePrefix"
		###*
		# @property officialSurname
		# @final
		# @type String
		###
		@officialSurname = _getset "_officialSurname"
		###*
		# @property birthSurname
		# @final
		# @type String
		###
		@birthSurname = _getset "_birthSurname"
		###*
		# @property birthNamePrefix
		# @final
		# @type String
		###
		@birthNamePrefix = _getset "_birthNamePrefix"
		###*
		# @property useBirthname
		# @final
		# @type Boolean
		###
		@useBirthname = _getset "_useBirthname"
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
		# Equal to firstName() + " " + lastName()
		# @property fullName
		# @final
		# @type String
		###
		@fullName = -> @firstName() + " " + @lastName()
		###*
		# @property birthDate
		# @final
		# @type Date
		###
		@birthDate = _getset "_birthDate"

	###*
	# The profile picture of the current User.
	#
	# @method profilePicture
	# @param [width=640] The width of the picture.
	# @param [height=640] The height of the picture.
	# @param [crop=false] Whether or not to crop the image.
	# @return {String} The URL to the picture, including the given options.
	###
	profilePicture: (width = 640, height = 640, crop = no) -> "#{@_magisterObj._personUrl}/foto?width=#{width}&height=#{height}&crop=#{crop}"

	###*
	# Fetch more detailedInfo of the current User.
	#
	# @method detailedInfo
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {DetailedProfileInfo} The detailed profile info of the current User.
	###
	detailedInfo: (callback) ->
		unless callback? then throw new Error "`callback` is required."
		push = _helpers.asyncResultWaiter 2, (r) -> callback null, DetailedProfileInfo._convertRaw _.extend r[0], r[1]

		@_magisterObj.http.get "#{@_magisterObj._personUrl}/profiel", {}, (e, r) ->
			if e? then callback e, null
			else push EJSON.parse r.content

		@_magisterObj.http.get "#{@_magisterObj._personUrl}/adresprofiel", {}, (e, r) ->
			if e? then callback e, null
			else push EJSON.parse r.content

	@_convertRaw: (magisterObj, raw) ->
		raw = raw.Persoon
		obj = new ProfileInfo magisterObj, raw.Roepnaam, raw.Achternaam, new Date Date.parse raw.Geboortedatum

		obj._id = raw.Id
		obj._officialFirstNames = raw.OfficieleVoornamen
		obj._initials = raw.Voorletters
		obj._namePrefix = raw.Tussenvoegsel
		obj._officialSurname = raw.OfficieleAchternaam
		obj._birthSurname = raw.GeboorteAchternaam
		obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel
		obj._useBirthname = raw.GebruikGeboortenaam

		return obj

###*
# More detailed information of the logged in user. Or a child.
#
# @class DetailedProfileInfo
# @private
# @constructor
###
class @DetailedProfileInfo
	constructor: ->
		###*
		# @property redirectMagisterMessages
		# @final
		# @type Boolean
		###
		@redirectMagisterMessages = _getset "_redirectMagisterMessages"
		###*
		# @property emailAddress
		# @final
		# @type String
		###
		@emailAddress = _getset "_emailAddress"
		###*
		# @property mobileNumber
		# @final
		# @type String
		###
		@mobileNumber = _getset "_mobileNumber"
		###*
		# @property postalCode
		# @final
		# @type String
		###
		@postalCode = _getset "_postalCode"
		###*
		# @property street
		# @final
		# @type String
		###
		@street = _getset "_street"
		###*
		# @property houseNumber
		# @final
		# @type Number
		###
		@houseNumber = _getset "_houseNumber"
		###*
		# String behind the `houseNumber` (eg 'A')
		#
		# @property suffix
		# @final
		# @type String
		###
		@suffix = _getset "_suffix"
		###*
		# @property city
		# @final
		# @type String
		###
		@city = _getset "_city"

	@_convertRaw: ->
		# Normally `_convertRaw` functions require 2 params.
		raw = arguments[if arguments.length is 2 then 1 else 0]

		obj = new DetailedProfileInfo

		obj._redirectMagisterMessages = raw.EloBerichtenDoorsturen
		obj._emailAddress = raw.EmailAdres
		obj._mobileNumber = raw.Mobiel

		obj._postalCode = raw.Postcode
		obj._street = raw.Straatnaam
		obj._houseNumber = raw.Huisnummer
		obj._suffix = raw.Toevoeging
		obj._city = raw.Woonplaats

		return obj

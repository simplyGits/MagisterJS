root = (module?.exports ? this.Magister ?= {})

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
class root.ProfileInfo
	constructor: (@_magisterObj, @_firstName, @_lastName, @_birthDate) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = root._getset "_id"
		###*
		# @property officialFirstNames
		# @final
		# @type String
		###
		@officialFirstNames = root._getset "_officialFirstNames"
		###*
		# @property initials
		# @final
		# @type String
		###
		@initials = root._getset "_initials"
		###*
		# @property namePrefix
		# @final
		# @type String
		###
		@namePrefix = root._getset "_namePrefix"
		###*
		# @property officialSurname
		# @final
		# @type String
		###
		@officialSurname = root._getset "_officialSurname"
		###*
		# @property birthSurname
		# @final
		# @type String
		###
		@birthSurname = root._getset "_birthSurname"
		###*
		# @property birthNamePrefix
		# @final
		# @type String
		###
		@birthNamePrefix = root._getset "_birthNamePrefix"
		###*
		# @property useBirthname
		# @final
		# @type Boolean
		###
		@useBirthname = root._getset "_useBirthname"
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
		# Equal to firstName() + " " + lastName()
		# @property fullName
		# @final
		# @type String
		###
		@fullName = -> @firstName() + " " + @lastName()
		###*
		# @property birthDate
		# @final
		# @type Date|undefined
		###
		@birthDate = root._getset "_birthDate"
		###*
		# @property isChild
		# @final
		# @type Boolean
		###
		@isChild = root._getset '_isChild'
		###*
		# @property isVisibleForParent
		# @final
		# @type Boolean
		###
		@isVisibleForParent = root._getset '_isVisibleForParent'

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
	# Fetch address info of the current user.
	# @method address
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {AddressInfo} The address info of the current user.
	###
	address: (callback) ->
		url = "#{@_magisterObj._personUrl}/adresprofiel"
		@_magisterObj.http.get url, {}, (e, r) ->
			if e? then callback e, null
			else
				parsed = JSON.parse r.content
				callback null, root.AddressInfo._convertRaw @_magisterObj, parsed

	###*
	# Fetch the profile settings of the current User.
	#
	# @method settings
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	# 	@param [callback.result] {ProfileSettings} The profile settings of the current User.
	###
	settings: (callback) ->
		url = "#{@_magisterObj._personUrl}/profiel"
		@_magisterObj.http.get url, {}, (e, r) =>
			if e? then callback e, null
			else
				parsed = JSON.parse r.content
				callback null, root.ProfileSettings._convertRaw @_magisterObj, parsed

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.ProfileInfo magisterObj, raw.Roepnaam, raw.Achternaam, root._helpers.parseDate raw.Geboortedatum

		obj._id = raw.Id
		obj._officialFirstNames = raw.OfficieleVoornamen
		obj._initials = raw.Voorletters
		obj._namePrefix = raw.Tussenvoegsel
		obj._officialSurname = raw.OfficieleAchternaam
		obj._birthSurname = raw.GeboorteAchternaam
		obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel
		obj._useBirthname = raw.GebruikGeboortenaam

		obj._isChild = raw.ZichtbaarVoorOuder?
		obj._isVisibleForParent = raw.ZichtbaarVoorOuder

		obj

###*
# Settings related to the profile of the logged in user. Or a child.
#
# @class ProfileSettings
# @private
# @constructor
###
class root.ProfileSettings
	constructor: (@_magisterObj) ->
		###*
		# @property redirectMagisterMessages
		# @type Boolean
		###
		@redirectMagisterMessages = root._getset '_redirectMagisterMessages', (x) => @_redirectMagisterMessages = x
		###*
		# @property emailAddress
		# @type String
		###
		@emailAddress = root._getset '_emailAddress', (x) => @_emailAddress = x
		###*
		# @property mobileNumber
		# @type String
		###
		@mobileNumber = root._getset '_mobileNumber', (x) => @_mobileNumber = x

	###*
	# @method update
	# @param callback {Function} A standard callback.
	# 	@param [callback.error] {Object} The error, if it exists.
	###
	update: (callback) ->
		url = "#{@_magisterObj._personUrl}/profiel"
		@_magisterObj.http.put url, @_toMagisterStyle(), {}, (e, r) -> callback e

	###*
	# @method _toMagisterStyle
	# @private
	# @return {Object}
	###
	_toMagisterStyle: ->
		obj = {}

		obj.EloBerichtenDoorsturen = @_redirectMagisterMessages
		obj.EmailAdres = @_emailAddress
		obj.Mobiel = @_mobileNumber

		obj

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.ProfileSettings magisterObj

		obj._redirectMagisterMessages = raw.EloBerichtenDoorsturen
		obj._emailAddress = raw.EmailAdres
		obj._mobileNumber = raw.Mobiel

		obj

###*
# Address info of the current logged in user. Or a child.
#
# @class AddressInfo
# @private
# @constructor
###
class @AddressInfo
	constructor: ->
		###*
		# @property postalCode
		# @final
		# @type String
		###
		@postalCode = root._getset "_postalCode"
		###*
		# @property street
		# @final
		# @type String
		###
		@street = root._getset "_street"
		###*
		# @property houseNumber
		# @final
		# @type Number
		###
		@houseNumber = root._getset "_houseNumber"
		###*
		# String behind the `houseNumber` (eg 'A')
		#
		# @property suffix
		# @final
		# @type String
		###
		@suffix = root._getset "_suffix"
		###*
		# @property city
		# @final
		# @type String
		###
		@city = root._getset "_city"

	@_convertRaw: (magisterObj, raw) ->
		obj = new root.AddressInfo

		obj._postalCode = raw.Postcode
		obj._street = raw.Straatnaam
		obj._houseNumber = raw.Huisnummer
		obj._suffix = raw.Toevoeging
		obj._city = raw.Woonplaats

		obj

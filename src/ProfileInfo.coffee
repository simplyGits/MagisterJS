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
	profilePicture: (width = 640, height = 640, crop = no) -> "#{@_profilePicture}?width=#{width}&height=#{height}&crop=#{crop}"

	@_convertRaw: (magisterObj, raw) ->
		foto = magisterObj.magisterSchool.url + _.find(raw.Links, Rel: "Foto").Href

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
		obj._profilePicture = foto

		return obj
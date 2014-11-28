###*
# An appointment.
#
# @class Appointment
# @private
# @param _magisterObj {Magister} A Magister object this Appointment is child of.
# @constructor
###
class @Appointment
	constructor: (@_magisterObj) ->
		###*
		# @property id
		# @final
		# @type Number
		###
		@id = _getset "_id"
		###*
		# @property begin
		# @final
		# @type Date
		###
		@begin = _getset "_begin"
		###*
		# @property end
		# @final
		# @type Date
		###
		@end = _getset "_end"
		###*
		# @property beginBySchoolHour
		# @final
		# @type Number
		###
		@beginBySchoolHour = _getset "_beginBySchoolHour"
		###*
		# @property endBySchoolHour
		# @final
		# @type Number
		###
		@endBySchoolHour = _getset "_endBySchoolHour"
		###*
		# @property fullDay
		# @final
		# @type Boolean
		###
		@fullDay = _getset "_fullDay"
		###*
		# @property description
		# @final
		# @type String
		###
		@description = _getset "_description"
		###*
		# @property location
		# @final
		# @type String
		###
		@location = _getset "_location"
		###*
		# @property status
		# @final
		# @type Number
		###
		@status = _getset "_status"
		###*
		# @property type
		# @final
		# @type Number
		###
		@type = _getset "_type"
		###*
		# @property displayType
		# @final
		# @type Number
		###
		@displayType = _getset "_displayType"
		###*
		# @property content
		# @final
		# @type String
		###
		@content = _getset "_content", null, (x) -> if x? then x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/\n{2,}/g, "\n").trim() else ""
		###*
		# @property infoType
		# @final
		# @type Number
		###
		@infoType = _getset "_infoType"
		###*
		# infoType parsed as a string.
		# @property infoTypeString
		# @final
		# @type String
		###
		@infoTypeString = _getset "_infoType", null, (x) ->
			return switch x
				when 0 then "none"
				when 1 then "homework"
				when 2 then "test"
				when 3 then "exam"
				when 4 then "quiz"
				when 5 then "oral test"
				when 6 then "information"

				else "unknown"
		###*
		# @property notes
		# @final
		# @type String
		###
		@notes = _getset "_notes"
		###*
		# @property isDone
		# @type Boolean
		###
		@isDone = _getset "_isDone", (d) =>
			return if @_isDone is d

			@_isDone = d
			@_magisterObj.http.put @url(), @_toMagisterStyle(), {}, (->)
		###*
		# @property classes
		# @final
		# @type String[]
		###
		@classes = _getset "_classes"
		###*
		# @property teachers
		# @final
		# @type Person[]
		###
		@teachers = _getset "_teachers"
		###*
		# @property classRooms
		# @final
		# @type String[]
		###
		@classRooms = _getset "_classRooms"
		###*
		# @property groups
		# @final
		# @type String[]
		###
		@groups = _getset "_groups"
		###*
		# @property appointmentId
		# @final
		# @type Number
		###
		@appointmentId = _getset "_appointmentId"
		###*
		# @property attachments
		# @final
		# @type File[]
		###
		@attachments = _getset "_attachments"
		###*
		# @property url
		# @final
		# @type String
		###
		@url = _getset "_url"
		###*
		# @property scrapped
		# @final
		# @type Boolean
		###
		@scrapped = _getset "_scrapped"
		###*
		# @property absenceInfo
		# @final
		# @type Object
		###
		@absenceInfo = _getset "_absenceInfo"

	_toMagisterStyle: ->
		obj = {}

		obj.Id = @_id
		obj.Start = _helpers.toUtcString @_begin
		obj.Einde = _helpers.toUtcString @_end
		obj.LesuurVan = @_beginBySchoolHour
		obj.LesuurTotMet = @_endBySchoolHour
		obj.DuurtHeleDag = @_fullDay
		obj.Omschrijving = @_description
		obj.Lokatie = @_location
		obj.Status = @_status
		obj.Type = @_type
		obj.WeergaveType = @_displayType
		obj.Inhoud = @_content
		obj.InfoType = @_infoType
		obj.Aantekening = @_notes
		obj.Afgerond = @_isDone
		obj.Lokalen = ( { Naam: c } for c in @_classRooms )
		obj.Docenten = ( p._toMagisterStyle() for p in @_teachers )
		obj.Vakken = ( { Naam: c } for c in @_classes )
		obj.Groepen = @_groups
		obj.OpdrachtId = @_appointmentId
		obj.Bijlagen = @_attachments ? []

		return obj

	_makeStorable: -> _.omit @, "_magisterObj"

	@_convertRaw: (magisterObj, raw) ->
		obj = new Appointment magisterObj

		obj._id = raw.Id
		obj._begin = new Date Date.parse raw.Start
		obj._end = new Date Date.parse raw.Einde
		obj._beginBySchoolHour = raw.LesuurVan
		obj._endBySchoolHour = raw.LesuurTotMet
		obj._fullDay = raw.DuurtHeleDag
		obj._description = raw.Omschrijving ? ""
		obj._location = raw.Lokatie ? ""
		obj._status = raw.Status
		obj._type = raw.Type
		obj._displayType = raw.WeergaveType
		obj._content = raw.Inhoud
		obj._infoType = raw.InfoType
		obj._notes = raw.Aantekening
		obj._isDone = raw.Afgerond
		obj._classes = if raw.Vakken? then (c.Naam for c in raw.Vakken) else []
		obj._teachers = if raw.Docenten? then (Person._convertRaw(magisterObj, p) for p in raw.Docenten) else []
		obj._classRooms = if raw.Lokalen? then (c.Naam for c in raw.Lokalen) else []
		obj._groups = raw.Groepen # ?
		obj._appointmentId = raw.OpdrachtId
		obj._attachments = raw.Bijlagen
		obj._url = "#{magisterObj._personUrl}/afspraken/#{obj._id}"
		obj._scrapped = raw.Status is 0

		return obj

	@_convertStored: (magisterObj, raw) ->
		obj = _.extend raw, new Appointment magisterObj
		obj._magisterObj = magisterObj
		obj._begin = new Date Date.parse raw._begin
		obj._end = new Date Date.parse raw._end
		return obj
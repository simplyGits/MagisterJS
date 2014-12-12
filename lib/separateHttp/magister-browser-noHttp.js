
/**
 * An appointment.
 *
 * @class Appointment
 * @private
 * @param _magisterObj {Magister} A Magister object this Appointment is child of.
 * @constructor
 */

(function() {
  var findQueries, messageFolder;

  this.Appointment = (function() {
    function Appointment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = _getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = _getset("_end");

      /**
      		 * @property beginBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.beginBySchoolHour = _getset("_beginBySchoolHour");

      /**
      		 * @property endBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.endBySchoolHour = _getset("_endBySchoolHour");

      /**
      		 * @property fullDay
      		 * @final
      		 * @type Boolean
       */
      this.fullDay = _getset("_fullDay");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description");

      /**
      		 * @property location
      		 * @final
      		 * @type String
       */
      this.location = _getset("_location");

      /**
      		 * @property status
      		 * @final
      		 * @type Number
       */
      this.status = _getset("_status");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");

      /**
      		 * @property displayType
      		 * @final
      		 * @type Number
       */
      this.displayType = _getset("_displayType");

      /**
      		 * @property content
      		 * @final
      		 * @type String
       */
      this.content = _getset("_content", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/\n{2,}/g, "\n").trim();
        } else {
          return "";
        }
      });

      /**
      		 * @property infoType
      		 * @final
      		 * @type Number
       */
      this.infoType = _getset("_infoType");

      /**
      		 * infoType parsed as a string.
      		 * @property infoTypeString
      		 * @final
      		 * @type String
       */
      this.infoTypeString = _getset("_infoType", null, function(x) {
        switch (x) {
          case 0:
            return "none";
          case 1:
            return "homework";
          case 2:
            return "test";
          case 3:
            return "exam";
          case 4:
            return "quiz";
          case 5:
            return "oral test";
          case 6:
            return "information";
          default:
            return "unknown";
        }
      });

      /**
      		 * @property notes
      		 * @final
      		 * @type String
       */
      this.notes = _getset("_notes");

      /**
      		 * @property isDone
      		 * @type Boolean
       */
      this.isDone = _getset("_isDone", (function(_this) {
        return function(d) {
          if (_this._isDone === d) {
            return;
          }
          _this._isDone = d;
          return _this._magisterObj.http.put(_this.url(), _this._toMagisterStyle(), {}, (function() {}));
        };
      })(this));

      /**
      		 * @property classes
      		 * @final
      		 * @type String[]
       */
      this.classes = _getset("_classes");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = _getset("_teachers");

      /**
      		 * @property classRooms
      		 * @final
      		 * @type String[]
       */
      this.classRooms = _getset("_classRooms");

      /**
      		 * @property groups
      		 * @final
      		 * @type String[]
       */
      this.groups = _getset("_groups");

      /**
      		 * @property appointmentId
      		 * @final
      		 * @type Number
       */
      this.appointmentId = _getset("_appointmentId");

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = _getset("_attachments");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = _getset("_url");

      /**
      		 * @property scrapped
      		 * @final
      		 * @type Boolean
       */
      this.scrapped = _getset("_scrapped");

      /**
      		 * @property absenceInfo
      		 * @final
      		 * @type Object
       */
      this.absenceInfo = _getset("_absenceInfo");
    }

    Appointment.prototype._toMagisterStyle = function() {
      var c, obj, p, _ref;
      obj = {};
      obj.Id = this._id;
      obj.Start = _helpers.toUtcString(this._begin);
      obj.Einde = _helpers.toUtcString(this._end);
      obj.LesuurVan = this._beginBySchoolHour;
      obj.LesuurTotMet = this._endBySchoolHour;
      obj.DuurtHeleDag = this._fullDay;
      obj.Omschrijving = this._description;
      obj.Lokatie = this._location;
      obj.Status = this._status;
      obj.Type = this._type;
      obj.WeergaveType = this._displayType;
      obj.Inhoud = this._content;
      obj.InfoType = this._infoType;
      obj.Aantekening = this._notes;
      obj.Afgerond = this._isDone;
      obj.Lokalen = (function() {
        var _i, _len, _ref, _results;
        _ref = this._classRooms;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Docenten = (function() {
        var _i, _len, _ref, _results;
        _ref = this._teachers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.Vakken = (function() {
        var _i, _len, _ref, _results;
        _ref = this._classes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Groepen = this._groups;
      obj.OpdrachtId = this._appointmentId;
      obj.Bijlagen = (_ref = this._attachments) != null ? _ref : [];
      return obj;
    };

    Appointment.prototype._makeStorable = function() {
      return _.omit(this, "_magisterObj");
    };

    Appointment._convertRaw = function(magisterObj, raw) {
      var c, obj, p, _ref, _ref1;
      obj = new Appointment(magisterObj);
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._beginBySchoolHour = raw.LesuurVan;
      obj._endBySchoolHour = raw.LesuurTotMet;
      obj._fullDay = raw.DuurtHeleDag;
      obj._description = (_ref = raw.Omschrijving) != null ? _ref : "";
      obj._location = (_ref1 = raw.Lokatie) != null ? _ref1 : "";
      obj._status = raw.Status;
      obj._type = raw.Type;
      obj._displayType = raw.WeergaveType;
      obj._content = raw.Inhoud;
      obj._infoType = raw.InfoType;
      obj._notes = raw.Aantekening;
      obj._isDone = raw.Afgerond;
      obj._classes = raw.Vakken != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Vakken;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          c = _ref2[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          _results.push(Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : [];
      obj._classRooms = raw.Lokalen != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Lokalen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          c = _ref2[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._groups = raw.Groepen;
      obj._appointmentId = raw.OpdrachtId;
      obj._attachments = raw.Bijlagen;
      obj._url = "" + magisterObj._personUrl + "/afspraken/" + obj._id;
      obj._scrapped = raw.Status === 0;
      return obj;
    };

    Appointment._convertStored = function(magisterObj, raw) {
      var obj;
      obj = _.extend(raw, new Appointment(magisterObj));
      obj._magisterObj = magisterObj;
      obj._begin = new Date(Date.parse(raw._begin));
      obj._end = new Date(Date.parse(raw._end));
      return obj;
    };

    return Appointment;

  })();


  /**
   * An Assignment.
   *
   * @class Assignment
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Assignment is child of.
   */

  this.Assignment = (function() {
    function Assignment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = _getset("_class");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = _getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = _getset("_handedInOn");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = _getset("_files");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = _getset("_teachers");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = _getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = _getset("_markedOn");

      /**
      		 * @property handInAgain
      		 * @final
      		 * @type Boolean
       */
      this.handInAgain = _getset("_handInAgain");

      /**
      		 * @property finished
      		 * @final
      		 * @type Boolean
       */
      this.finished = _getset("_finished");

      /**
      		 * @property canHandIn
      		 * @final
      		 * @type Boolean
       */
      this.canHandIn = _getset("_canHandIn");
    }


    /**
    	 * Gets the versions of this Assigment.
    	 *
    	 * @method versions
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {AssignmentVersion[]} An array containing AssignmentVersions.
     */

    Assignment.prototype.versions = function(callback) {
      var id, pushResult, _i, _len, _ref, _results;
      pushResult = _helpers.asyncResultWaiter(this._versionIds.length, function(r) {
        return callback(null, r);
      });
      _ref = this._versionIds;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        _results.push(this._magisterObj.http.get("" + this._magisterObj._personUrl + "/opdrachten/versie/" + id, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return callback(error, null);
            } else {
              return pushResult(AssignmentVersion._convertRaw(_this._magisterObj, _this, EJSON.parse(result.content)));
            }
          };
        })(this)));
      }
      return _results;
    };

    Assignment._convertRaw = function(magisterObj, raw) {
      var f, obj, p, v;
      obj = new Assignment(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._class = raw.Vak;
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._files = (function() {
        var _i, _len, _ref, _results;
        _ref = raw.Bijlagen;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref, _results;
        _ref = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : void 0;
      obj._versionIds = (function() {
        var _i, _len, _ref, _results;
        _ref = raw.VersieNavigatieItems;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          _results.push(v.Id);
        }
        return _results;
      })();
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._handInAgain = raw.OpnieuwInleveren;
      obj._finished = raw.Afgesloten;
      obj._canHandIn = raw.MagInleveren;
      return obj;
    };

    return Assignment;

  })();


  /**
   * An (handed in) version of an Assignment.
   *
   * @class AssignmentVersion
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this AssignmentVersion is child of.
   */

  this.AssignmentVersion = (function() {
    function AssignmentVersion(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = _getset("_class");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = _getset("_state");

      /**
      		 * @property pupilMessage
      		 * @final
      		 * @type String
       */
      this.pupilMessage = _getset("_pupilMessage");

      /**
      		 * @property teacherNotice
      		 * @final
      		 * @type String
       */
      this.teacherNotice = _getset("_teacherNotice");

      /**
      		 * @property handedInFiles
      		 * @final
      		 * @type File[]
       */
      this.handedInFiles = _getset("_handedInFiles");

      /**
      		 * @property feedbackFiles
      		 * @final
      		 * @type File[]
       */
      this.feedbackFiles = _getset("_feedbackFiles");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = _getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = _getset("_handedInOn");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = _getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = _getset("_markedOn");

      /**
      		 * @property version
      		 * @final
      		 * @type Number
       */
      this.version = _getset("_version");

      /**
      		 * @property tooLate
      		 * @final
      		 * @type Boolean
       */
      this.tooLate = _getset("_tooLate");
    }

    AssignmentVersion._convertRaw = function(magisterObj, sender, raw) {
      var f, obj;
      obj = new AssignmentVersion(magisterObj);
      obj._id = raw.Id;
      obj._class = sender._class;
      obj._state = raw.Status;
      obj._pupilMessage = raw.LeerlingOpmerking;
      obj._teacherNotice = raw.DocentOpmerking;
      obj._handedInFiles = (function() {
        var _i, _len, _ref, _results;
        _ref = raw.LeerlingBijlagen;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._feedbackFiles = (function() {
        var _i, _len, _ref, _results;
        _ref = raw.FeedbackBijlagen;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._version = raw.VersieNummer;
      obj._tooLate = raw.IsTeLaat;
      return obj;
    };

    return AssignmentVersion;

  })();


  /**
   * A Class (ex. English class)
   *
   * @class Class
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Class is child of.
   */

  this.Class = (function() {
    function Class(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property beginDate
      		 * @final
      		 * @type Date
       */
      this.beginDate = _getset("_beginDate");

      /**
      		 * @property endDate
      		 * @final
      		 * @type Date
       */
      this.endDate = _getset("_endDate");

      /**
      		 * @property licenseUrl
      		 * @final
      		 * @type String
       */
      this.licenseUrl = _getset("_licenseUrl");

      /**
      		 * @property abbreviation
      		 * @final
      		 * @type String
       */
      this.abbreviation = _getset("_abbreviation");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = _getset("_number");
    }

    Class._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new Class(magisterObj);
      obj._id = raw.Id;
      obj._beginDate = new Date(Date.parse(raw.Begindatum));
      obj._endDate = new Date(Date.parse(raw.Einddatum));
      obj._licenseUrl = raw.LicentieUrl;
      obj._abbreviation = raw.Afkorting;
      obj._description = raw.Omschrijving;
      obj._number = raw.Volgnr;
      return obj;
    };

    return Class;

  })();


  /**
   * A Course (like: 4 VWO E/M 14-15).
   *
   * @class Course
   * @private
   * @param _magisterObj {Magister} A Magister object this Course is child of.
   * @constructor
   */

  this.Course = (function() {
    function Course(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = _getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = _getset("_end");

      /**
      		 * The 'school period' of this Course (e.g: "1415").
      		 * @property schoolPeriod
      		 * @final
      		 * @type String
       */
      this.schoolPeriod = _getset("_schoolPeriod");

      /**
      		 * Type of this Course (e.g: { description: "VWO 4", id: 420 }).
      		 * @property type
      		 * @final
      		 * @type Object
       */
      this.type = _getset("_type");

      /**
      		 * The group of this Course contains the class the user belongs to (e.g: { description: "Klas 4v3", id: 420, locationId: 0 }).
      		 * @property group
      		 * @final
      		 * @type Object
       */
      this.group = _getset("_group");

      /**
      		 * The 'profile' of this Course (e.g: "A-EM").
      		 * @property profile
      		 * @final
      		 * @type String
       */
      this.profile = _getset("_profile");

      /**
      		 * An alternative profile, if it exists (e.g: "A-EM").
      		 * @property alternativeProfile
      		 * @final
      		 * @type String
       */
      this.alternativeProfile = _getset("_alternativeProfile");
    }


    /**
    	 * Gets the classes of this Course.
    	 *
    	 * @method classes
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Class[]} An array containing the Classes.
     */

    Course.prototype.classes = function(callback) {
      return this._magisterObj.http.get(this._classesUrl, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref, _results;
              _ref = EJSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                c = _ref[_i];
                _results.push(Class._convertRaw(this._magisterObj, c));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the grades of this Course.
    	 *
    	 * @method grades
    	 * @async
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade[]} An array containing the Grades.
     */

    Course.prototype.grades = function() {
      var callback, download, _ref;
      download = (_ref = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get(this._gradesUrl, {}, (function(_this) {
        return function(error, result) {
          var g, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = EJSON.parse(result.content).Items;
            pushResult = _helpers.asyncResultWaiter(result.length, function(r) {
              var c, g, _i, _j, _len, _len1, _ref1, _ref2;
              _ref1 = _.uniq(r, function(g) {
                return g["class"]().id();
              }).map(function(g) {
                return g["class"]();
              });
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                c = _ref1[_i];
                _ref2 = _.filter(r, function(g) {
                  return g["class"]().id() === c.id();
                });
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  g = _ref2[_j];
                  g._class = c;
                }
              }
              return callback(null, r);
            });
            _results = [];
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              g = result[_i];
              _results.push((function(g) {
                g.teacher = Person._convertRaw(_this._magisterObj, {
                  Docentcode: g.Docent
                });
                g.teacher._type = 3;
                if (download) {
                  return _this._magisterObj.getPersons(g.Docent, 3, function(e, r) {
                    var teacher;
                    if (!((e != null) || (r[0] == null))) {
                      teacher = r[0];
                    }
                    return pushResult(Grade._convertRaw(_this._magisterObj, g));
                  });
                } else {
                  return pushResult(Grade._convertRaw(_this._magisterObj, g));
                }
              })(g));
            }
            return _results;
          }
        };
      })(this));
    };

    Course._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new Course(magisterObj);
      obj._classesUrl = magisterObj.magisterSchool.url + _.find(raw.Links, {
        Rel: "Vakken"
      }).Href;
      obj._gradesUrl = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/cijfers/cijferoverzichtvooraanmelding?actievePerioden=true&alleenBerekendeKolommen=false&alleenPTAKolommen=false");
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._schoolPeriod = raw.Lesperiode;
      obj._type = {
        id: raw.Studie.Id,
        description: raw.Studie.Omschrijving
      };
      obj._group = {
        id: raw.Groep.Id,
        description: raw.Groep.Omschrijving,
        locationId: raw.Groep.LocatieId
      };
      obj._profile = raw.Profiel;
      obj._alternativeProfile = raw.Profiel2;
      return obj;
    };

    return Course;

  })();


  /**
   * A Digital school utility, usually things like a gateway to an online platform of a book used by a school.
   *
   * @class DigitalSchoolUtility
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this DigitalSchoolUtility is child of.
   */

  this.DigitalSchoolUtility = (function() {
    function DigitalSchoolUtility(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property publisher
      		 * @final
      		 * @type String
       */
      this.publisher = _getset("_publisher");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = _getset("_state");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = _getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = _getset("_end");

      /**
      		 * @property EAN
      		 * @final
      		 * @type Number
       */
      this.EAN = _getset("_EAN");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = _getset("_url");

      /**
      		 * This should be a Class object, if no class was found this will be undefined.
      		 * @property class
      		 * @final
      		 * @type Class|undefined
       */
      this["class"] = _getset("_class");
    }

    DigitalSchoolUtility._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new DigitalSchoolUtility(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.MateriaalType;
      obj._name = raw.Titel;
      obj._publisher = raw.Uitgeverij;
      obj._state = raw.Status;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Eind));
      obj._EAN = Number(raw.EAN);
      obj._url = raw.Url;
      obj._class = raw.Vak;
      return obj;
    };

    return DigitalSchoolUtility;

  })();


  /**
   * A folder containing File instances.
   *
   * @class FileFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this FileFolder is child of.
   * @constructor
   */

  this.FileFolder = (function() {
    function FileFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * The rights the current user has on this FileFolder.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = _getset("_rights");

      /**
      		 * The ID of the parent FileFolder of this FileFolder.
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = _getset("_parentId");
    }


    /**
    	 * Gets all the files in the current FileFolder.
    	 *
    	 * @method files
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {File[]} The results as an Array.
     */

    FileFolder.prototype.files = function(callback) {
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/bronnen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var f, files, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            files = (function() {
              var _i, _len, _ref, _results;
              _ref = EJSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                f = _ref[_i];
                _results.push(File._convertRaw(this._magisterObj, this, f));
              }
              return _results;
            }).call(_this);
            pushResult = _helpers.asyncResultWaiter(files.length, function(r) {
              return callback(null, files);
            });
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              f = files[_i];
              _results.push((function(f) {
                return _this._magisterObj.getPersons(f.GeplaatstDoor, function(e, r) {
                  if (!((e != null) || r.length === 0)) {
                    f._addedBy = r[0];
                  }
                  return pushResult();
                });
              })(f));
            }
            return _results;
          }
        };
      })(this));
    };

    FileFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new FileFolder(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Naam;
      obj._rights = raw.Privilege;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return FileFolder;

  })();


  /**
   * A file from Magister, can be downloaded.
   *
   * @class File
   * @private
   * @param _magisterObj {Magister} A Magister object this File is child of.
   * @constructor
   */

  this.File = (function() {
    function File(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");

      /**
      		 * @property name
      		 * @type String
       */
      this.name = _getset("_name", (function(_this) {
        return function(x) {
          _this._name = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property uri
      		 * @final
      		 * @type String
       */
      this.uri = _getset("_uri");

      /**
      		 * The size of this file in bytes.
      		 * @property size
      		 * @final
      		 * @type Number
       */
      this.size = _getset("_size");

      /**
      		 * The rights the current user has on this File.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = _getset("_rights");

      /**
      		 * @property mime
      		 * @final
      		 * @type String
       */
      this.mime = _getset("_mime");

      /**
      		 * @property changedDate
      		 * @final
      		 * @type Date
       */
      this.changedDate = _getset("_changedDate");

      /**
      		 * @property creationDate
      		 * @final
      		 * @type Date
       */
      this.creationDate = _getset("_creationDate");

      /**
      		 * @property addedBy
      		 * @final
      		 * @type Person
       */
      this.addedBy = _getset("_addedBy");

      /**
      		 * @property fileBlobId
      		 * @final
      		 * @type Number
       */
      this.fileBlobId = _getset("_fileBlobId");

      /**
      		 * The FileFolder this File is in.
      		 * @property fileFolder
      		 * @type FileFolder
       */
      this.fileFolder = _getset("_fileFolder", this.move);

      /**
      		 * @property uniqueId
      		 * @final
      		 * @type String
       */
      this.uniqueId = _getset("_uniqueId");
    }


    /**
    	 * Downloads the current file
    	 *
    	 * @method download
    	 * @async
    	 * @param [downloadFile=true] {Boolean} Whether or not to download the file directly. Only works client-side.
    	 * @param [callback] {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {String} A string containing the binary data of the downloaded file.
     */

    File.prototype.download = function() {
      var callback, downloadFile, _ref;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      downloadFile = (_ref = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref : true;
      return this._magisterObj.http.get(this._downloadUrl, {}, (function(_this) {
        return function(error, result) {
          var data;
          if (error != null) {
            return callback(error, null);
          } else {
            data = result.content;
            if (downloadFile) {
              _helpers.saveFile(data, _this.mime(), _this.name());
            }
            return typeof callback === "function" ? callback(null, data) : void 0;
          }
        };
      })(this));
    };


    /**
    	 * Moves the current File to another FileFolder
    	 *
    	 * @method move
    	 * @param fileFolder {FileFolder|Number|String} A FileFolder, an ID of a FileFolder or (a part of) the name of a FileFolder.
     */

    File.prototype.move = function(fileFolder) {
      return this._magisterObj.fileFolders((function(_this) {
        return function(e, r) {
          if (e != null) {
            throw e;
          }
          if (!_.isObject(fileFolder)) {
            fileFolder = _.find(r, function(f) {
              return _helpers.contains(f.name(), fileFolder, true) || f.id() === fileFolder;
            });
          }
          _this._fileFolder = fileFolder;
          return _this._update();
        };
      })(this));
    };


    /**
    	 * WARNING. Removes the current File.
    	 *
    	 * @method remove
     */

    File.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };


    /**
    	 * Updates the current File on the Magister servers.
    	 *
    	 * @private
    	 * @method _update
     */

    File.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), this._toMagisterStyle(), {}, (function() {}));
    };

    File.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.BronSoort = this._type;
      obj.Naam = this._name;
      obj.Uri = this._uri;
      obj.Grootte = this._size;
      obj.Privilege = this._rights;
      obj.ContentType = this._mime;
      obj.FileBlobId = this._fileBlobId;
      obj.ParentId = this._fileFolder.id();
      obj.UniqueId = this._uniqueId;
      return obj;
    };

    File._convertRaw = function(magisterObj, sender, raw) {
      var addedBy, l, obj, _ref;
      if (raw._addedBy != null) {
        addedBy = raw._addedBy;
      } else {
        addedBy = new Person(magisterObj, null, "", "");
        addedBy._fullName = raw.GeplaatstDoor;
      }
      obj = new File(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.BronSoort;
      obj._name = raw.Naam;
      obj._uri = raw.Uri;
      obj._size = raw.Grootte;
      obj._rights = raw.Privilege;
      obj._mime = raw.ContentType;
      obj._changedDate = new Date(Date.parse(raw.GewijzigdOp));
      obj._creationDate = new Date(Date.parse((_ref = raw.GemaaktOp) != null ? _ref : raw.Datum));
      obj._addedBy = addedBy;
      obj._fileBlobId = raw.FileBlobId;
      obj._fileFolder = sender;
      obj._uniqueId = raw.UniqueId;
      l = _.find(raw.Links, {
        Rel: "Contents"
      });
      if (l == null) {
        l = _.find(raw.Links, {
          Rel: "Self"
        });
      }
      obj._downloadUrl = magisterObj.magisterSchool.url + l.Href;
      return obj;
    };

    return File;

  })();


  /**
   * A Grade (ex. 1,0)
   *
   * @class Grade
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Grade is child of.
   */

  this.Grade = (function() {
    function Grade(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = _getset("_grade");

      /**
      		 * @property passed
      		 * @final
      		 * @type Boolean
       */
      this.passed = _getset("_passed");

      /**
      		 * @property dateFilledIn
      		 * @final
      		 * @type Date
       */
      this.dateFilledIn = _getset("_dateFilledIn");

      /**
      		 * @property gradePeriod
      		 * @final
      		 * @type Object
       */
      this.gradePeriod = _getset("_gradePeriod");

      /**
      		 * @property class
      		 * @final
      		 * @type Object
       */
      this["class"] = _getset("_class");

      /**
      		 * @property atLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.atLaterDate = _getset("_atLaterDate");

      /**
      		 * @property exemption
      		 * @final
      		 * @type Boolean
       */
      this.exemption = _getset("_exemption");

      /**
      		 * @property counts
      		 * @final
      		 * @type Boolean
       */
      this.counts = _getset("_counts");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = _getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = _getset("_classExemption");
    }

    Grade._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new Grade(magisterObj);
      obj._id = raw.CijferId;
      obj._grade = raw.CijferStr;
      obj._passed = raw.IsVoldoende;
      obj._dateFilledIn = new Date(Date.parse(raw.DatumIngevoerd));
      obj._gradePeriod = {
        id: function() {
          return raw.CijferPeriode.Id;
        },
        abbreviation: function() {
          return raw.CijferPeriode.Afkorting;
        }
      };
      obj._class = {
        id: function() {
          return raw.Vak.Id;
        },
        abbreviation: function() {
          return raw.Vak.Afkorting;
        },
        description: function() {
          return raw.Vak.Omschrijving;
        }
      };
      obj._atLaterDate = raw.Inhalen;
      obj._exemption = raw.Vrijstelling;
      obj._counts = raw.TeltMee;
      obj._type = GradeType._convertRaw(magisterObj, raw.CijferKolom);
      obj._assignmentId = raw.CijferKolomIdEloOpdracht;
      obj._teacher = raw.teacher;
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      return obj;
    };

    return Grade;

  })();


  /**
   * A Type of a Grade object.
   *
   * @class GradeType
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this GradeType is child of.
   */

  this.GradeType = (function() {
    function GradeType(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = _getset("_number");

      /**
      		 * @property header
      		 * @final
      		 * @type String
       */
      this.header = _getset("_header");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");

      /**
      		 * @property isAtLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.isAtLaterDate = _getset("_isAtLaterDate");

      /**
      		 * @property isTeacher
      		 * @final
      		 * @type Boolean
       */
      this.isTeacher = _getset("_isTeacher");

      /**
      		 * @property hasNestedTypes
      		 * @final
      		 * @type Boolean
       */
      this.hasNestedTypes = _getset("_hasNestedTypes");

      /**
      		 * @property isPTA
      		 * @final
      		 * @type Boolean
       */
      this.isPTA = _getset("_isPTA");
    }

    GradeType._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new GradeType(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.KolomNaam;
      obj._number = raw.KolomNummer;
      obj._header = raw.KolomKop;
      obj._description = raw.KolomOmschrijving;
      obj._type = raw.KolomSoort;
      obj._isAtLaterDate = raw.IsHerkansingKolom;
      obj._isTeacher = raw.IsDocentKolom;
      obj._hasNestedTypes = raw.HeeftOndeliggendeKolommen;
      obj._isPTA = raw.IsPTAKolom;
      return obj;
    };

    return GradeType;

  })();


  /**
   * A JavaScript implementation of the Magister 6 API.
   * @author Lieuwe Rooijakkers
   * @module Magister
   */


  /**
   * Class to communicate with Magister.
   *
   * @class Magister
   * @param magisterSchool {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
   * @param username {String} The username of the user to login to.
   * @param password {String} The password of the user to login to.
   * @param [_keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
   * @constructor
   */

  this.Magister = (function() {
    function Magister(magisterSchool, username, password, _keepLoggedIn) {
      this.magisterSchool = magisterSchool;
      this.username = username;
      this.password = password;
      this._keepLoggedIn = _keepLoggedIn != null ? _keepLoggedIn : true;
      if (!(arguments.length === 3 || arguments.length === 4)) {
        throw new Error("Expected 3 or 4 arguments, got " + arguments.length);
      }
      this._readyCallbacks = [];
      this.http = new MagisterHttp();
      if (_.isString(this.magisterSchool)) {
        MagisterSchool.getSchools(this.magisterSchool, (function(_this) {
          return function(e, r) {
            if (e != null) {
              throw e;
            } else if (r.length === 0) {
              throw new Error("No school with the query " + _this.magisterSchool + " found.");
            } else {
              _this.magisterSchool = r[0];
              return _this.reLogin();
            }
          };
        })(this));
      } else {
        this.reLogin();
      }
    }


    /**
    	 * Get the appoinments of the current User between the two given Dates.
    	 *
    	 * @method appointments
    	 * @async
    	 * @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
    	 * @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Appointment[]} An array containing the Appointments.
     */

    Magister.prototype.appointments = function() {
      var callback, dateConvert, download, from, to, url, _ref, _ref1;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      download = (_ref = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref : true;
      _ref1 = _.where(arguments, function(a) {
        return _.isDate(a);
      }), from = _ref1[0], to = _ref1[1];
      if (!_.isDate(to)) {
        to = from;
      }
      this._forceReady();
      dateConvert = _helpers.urlDateConvert;
      url = "" + this._personUrl + "/afspraken?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from));
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var a, absences, appointments, hit, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = EJSON.parse(result.content);
            appointments = (function() {
              var _i, _len, _ref2, _results;
              _ref2 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                a = _ref2[_i];
                _results.push(Appointment._convertRaw(this, a));
              }
              return _results;
            }).call(_this);
            absences = [];
            hit = _helpers.asyncResultWaiter(3, function(r) {
              var _fn, _i, _len;
              _fn = function(a) {
                return a._absenceInfo = _.find(absences, function(absence) {
                  return absence.appointmentId === a.id();
                });
              };
              for (_i = 0, _len = appointments.length; _i < _len; _i++) {
                a = appointments[_i];
                _fn(a);
              }
              _.remove(appointments, function(a) {
                return _helpers.date(a.begin()) < _helpers.date(from) || _helpers.date(a.end()) > _helpers.date(to);
              });
              return callback(null, _.sortBy(appointments, function(x) {
                return x.begin();
              }));
            });
            _this.http.get("" + _this._personUrl + "/roosterwijzigingen?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              var appointment, c, _i, _len, _ref2;
              _ref2 = EJSON.parse(result.content).Items;
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                c = _ref2[_i];
                appointment = Appointment._convertRaw(_this, c);
                _.remove(appointments, function(a) {
                  return a.id() === appointment.id();
                });
                appointments.push(appointment);
              }
              return hit();
            });
            _this.http.get("" + _this._personUrl + "/absenties?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              var _fn, _i, _len;
              result = EJSON.parse(result.content).Items;
              _fn = function(a) {
                return absences.push({
                  id: a.Id,
                  begin: new Date(Date.parse(a.Start)),
                  end: new Date(Date.parse(a.Eind)),
                  schoolHour: a.Lesuur,
                  permitted: a.Geoorloofd,
                  appointmentId: a.AfspraakId,
                  description: _helpers.trim(a.Omschrijving),
                  type: a.VerantwoordingType,
                  code: a.Code
                });
              };
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                a = result[_i];
                _fn(a);
              }
              return hit();
            });
            if (download) {
              pushResult = _helpers.asyncResultWaiter(appointments.length, function() {
                return hit();
              });
              _results = [];
              for (_i = 0, _len = appointments.length; _i < _len; _i++) {
                a = appointments[_i];
                _results.push((function(a) {
                  var teachers, _ref2;
                  teachers = (_ref2 = a.teachers()) != null ? _ref2 : [];
                  return _this.fillPersons(teachers, (function(e, r) {
                    a._teachers = r;
                    return pushResult();
                  }), 3);
                })(a));
              }
              return _results;
            } else {
              return hit();
            }
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @param [query] {String} A case insensetive query the MessageFolder need to match.
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {null} Will always be null
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    Magister.prototype.messageFolders = function(query, callback) {
      var result;
      if (callback == null) {
        callback = function() {};
      }
      this._forceReady();
      if (_.isString(query) && query !== "") {
        result = _.where(this._messageFolders, function(mF) {
          return _helpers.contains(mF.name(), query, true);
        });
      } else {
        result = this._messageFolders;
      }
      callback(null, result);
      return result;
    };


    /**
    	 * @method inbox
    	 * @return {MessageFolder} The inbox of the current user.
     */

    Magister.prototype.inbox = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("postvak in", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method sentItems
    	 * @return {MessageFolder} The sent items folder of the current user.
     */

    Magister.prototype.sentItems = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verzonden items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method bin
    	 * @return {MessageFolder} The bin of the current user.
     */

    Magister.prototype.bin = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verwijderde items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method alerts
    	 * @return {MessageFolder} The alerts folder of the current user.
     */

    Magister.prototype.alerts = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("mededelingen", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * Gets the courses of the current User.
    	 *
    	 * @method courses
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Course[]} An array containing the Courses.
     */

    Magister.prototype.courses = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/aanmeldingen";
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            result = EJSON.parse(result.content);
            return callback(null, _.sortBy((function() {
              var _i, _len, _ref, _results;
              _ref = result.Items;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                c = _ref[_i];
                _results.push(Course._convertRaw(this, c));
              }
              return _results;
            }).call(_this), function(c) {
              return c.begin();
            }).reverse());
          }
        };
      })(this));
    };

    Magister._cachedPersons = {};


    /**
    	 * Gets an Array of Persons that matches the given profile.
    	 *
    	 * @method getPersons
    	 * @async
    	 * @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
    	 * @param [type] {String|Number} The type the person must have. If none is given it will search for both Teachers and Pupils.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person[]} An array containing the Persons.
     */

    Magister.prototype.getPersons = function() {
      var callback, query, type, url, val;
      this._forceReady();
      query = _helpers.trim(arguments[0]);
      callback = arguments.length === 2 ? arguments[1] : arguments[2];
      if (arguments.length === 3) {
        type = arguments[1];
      }
      if (!((query != null) && (callback != null) && query.length >= 3)) {
        callback(null, []);
        return void 0;
      }
      if (type == null) {
        this.getPersons(query, 3, (function(_this) {
          return function(e, r) {
            var teachers;
            if (e != null) {
              return callback(e, null);
            } else {
              teachers = r;
              return _this.getPersons(query, 4, function(e, r) {
                if (e != null) {
                  return callback(e, null);
                } else {
                  return callback(null, _helpers.pushMore(r, teachers));
                }
              });
            }
          };
        })(this));
        return void 0;
      }
      type = (function() {
        switch (Person._convertType(type)) {
          case 1:
            return "Groep";
          case 3:
            return "Docent";
          case 4:
            return "Leerling";
          case 8:
            return "Project";
          default:
            return "Overig";
        }
      })();
      url = "" + this._personUrl + "/contactpersonen?contactPersoonType=" + type + "&q=" + query;
      if ((val = Magister._cachedPersons["" + this._id + type + query]) != null) {
        return callback(null, val);
      } else {
        return this.http.get(url, {}, (function(_this) {
          return function(error, result) {
            var p;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref, _results;
                _ref = EJSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  p = _ref[_i];
                  _results.push(Person._convertRaw(this, p));
                }
                return _results;
              }).call(_this);
              Magister._cachedPersons["" + _this._id + type + query] = result;
              return callback(null, result);
            }
          };
        })(this));
      }
    };


    /**
    	 * Fills the given person(s) by downloading the person from Magister and replacing the local instance.
    	 *
    	 * @method fillPersons
    	 * @async
    	 * @param persons {Person|Person[]} A Person or an Array of Persons to fetch more information for.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person|Person[]} A fetched person or an array containing the fetched Persons, according to the type of the given persons parameter.
    	 * @param [overwriteType] {Number|String} Not recommended. Forces the type used to search the persons for.
     */

    Magister.prototype.fillPersons = function(persons, callback, overwriteType) {
      var p, pushResult, _i, _len, _ref, _ref1;
      this._forceReady();
      if (_.isArray(persons)) {
        if (persons.length === 0) {
          callback(null, []);
          return void 0;
        }
        pushResult = _helpers.asyncResultWaiter(persons.length, function(r) {
          return callback(null, r);
        });
        for (_i = 0, _len = persons.length; _i < _len; _i++) {
          p = persons[_i];
          try {
            this.getPersons(_.last(p.fullName().split(" ")), (_ref = p._type) != null ? _ref : overwriteType, function(e, r) {
              var _ref1;
              if ((e != null) || (r == null)) {
                throw e;
              } else {
                return pushResult((_ref1 = r[0]) != null ? _ref1 : p);
              }
            });
          } catch (_error) {
            pushResult(p);
          }
        }
      } else if (_.isObject(persons)) {
        try {
          this.getPersons(_.last(persons.fullName().split(" ")), (_ref1 = persons._type) != null ? _ref1 : overwriteType, function(e, r) {
            var _ref2;
            if ((e != null) || (r == null)) {
              throw e;
            } else {
              return callback(null, (_ref2 = r[0]) != null ? _ref2 : persons);
            }
          });
        } catch (_error) {
          callback(persons);
        }
      } else {
        throw new Error("Expected persons to be an Array or an Object, got a(n) " + (typeof persons));
      }
      return void 0;
    };


    /**
    	 * Shortcut for composing and sending a Message.
    	 *
    	 * @method composeAndSendMessage
    	 * @param subject {String} The subject of the message
    	 * @param [body] {String} The body of the message, if none is given the body will be empty.
    	 * @param recipients {Person[]|String[]|Person|String} The recipient(s) the message will be sent to.
     */

    Magister.prototype.composeAndSendMessage = function() {
      var body, m, recipients, subject, _ref;
      this._forceReady();
      _ref = _.filter(arguments, function(a) {
        return _.isString(a);
      }), subject = _ref[0], body = _ref[1];
      recipients = _.last(arguments);
      if (arguments.length === 2) {
        body = "";
      }
      m = new Message(this);
      m.subject(subject);
      m.body(body != null ? body : "");
      m.addRecipient(recipients);
      return m.send();
    };


    /**
    	 * Gets the FileFolders of the current user.
    	 *
    	 * @method fileFolders
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {FileFolder[]} An array containing FileFolders.
     */

    Magister.prototype.fileFolders = function(callback) {
      this._forceReady();
      return this.http.get("" + this._personUrl + "/bronnen?soort=0", {}, (function(_this) {
        return function(error, result) {
          var f;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref, _results;
              _ref = EJSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                f = _ref[_i];
                _results.push(FileFolder._convertRaw(this, f));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the StudyGuides of the current user.
    	 *
    	 * @method studyGuides
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
     */

    Magister.prototype.studyGuides = function(callback) {
      this._forceReady();
      return this.http.get("" + this._pupilUrl + "/studiewijzers?peildatum=" + (_helpers.urlDateConvert(new Date)), {}, (function(_this) {
        return function(error, result) {
          var s;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref, _results;
              _ref = EJSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                s = _ref[_i];
                _results.push(StudyGuide._convertRaw(this, s));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the Assignments for the current user.
    	 *
    	 * @method assignments
    	 * @async
    	 * @param [amount=50] {Number} The amount of Assignments to fetch from the server.
    	 * @param [skip=0] {Number} The amount of Assignments to skip.
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Assignment[]} An array containing Assignments.
     */

    Magister.prototype.assignments = function() {
      var amount, callback, cb, download, skip, _ref;
      this._forceReady();
      _ref = _.filter(arguments, function(a) {
        return _.isNumber(a);
      }), amount = _ref[0], skip = _ref[1];
      download = _.find(arguments, function(a) {
        return _.isBoolean(a);
      });
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (download == null) {
        download = true;
      }
      if (amount == null) {
        amount = 50;
      }
      if (skip == null) {
        skip = 0;
      }
      this.courses(function(e, r) {
        if ((r != null) && r.length !== 0) {
          return r[0].classes(function(e, r) {
            if ((r != null) && r.length !== 0) {
              return cb(r);
            } else {
              return cb();
            }
          });
        } else {
          return cb();
        }
      });
      return cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._personUrl + "/opdrachten?skip=" + skip + "&top=" + amount + "&status=alle", {}, function(error, result) {
            var e, id, pushResult, _i, _len, _results;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref1, _results;
                _ref1 = EJSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  e = _ref1[_i];
                  _results.push(e.Id);
                }
                return _results;
              })();
              pushResult = _helpers.asyncResultWaiter(result.length, function(r) {
                return callback(null, r);
              });
              _results = [];
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                id = result[_i];
                _results.push(_this.http.get("" + _this._personUrl + "/opdrachten/" + id, {}, function(error, result) {
                  var assignment, teachers, _ref1;
                  assignment = Assignment._convertRaw(_this, EJSON.parse(result.content));
                  if (classes != null) {
                    assignment._class = _.find(classes, function(c) {
                      return c.abbreviation() === assignment._class;
                    });
                  }
                  if (download) {
                    teachers = (_ref1 = assignment.teachers()) != null ? _ref1 : [];
                    return _this.fillPersons(teachers, (function(e, r) {
                      assignment._teachers = r;
                      return pushResult(assignment);
                    }), 3);
                  } else {
                    return pushResult(assignment);
                  }
                }));
              }
              return _results;
            }
          });
        };
      })(this);
    };


    /**
    	 * Gets the Digital school utilities for the current user.
    	 *
    	 * @method digitalSchoolUtilities
    	 * @async
    	 * @fixme /NOT WORKING/ (Weird ID mismatch) @param [class] {Class|Number} The class or ID of a class to get the Digital school utitlities for. If none is given it will return every DigitalSchoolUtility.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
     */

    Magister.prototype.digitalSchoolUtilities = function() {
      var callback, classes, url, _class;
      this._forceReady();
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (_.isObject(_class)) {
        _class = _class.id();
      }
      url = _class != null ? "" + this._personUrl + "/lesmateriaal?vakken=" + _class : "" + this._personUrl + "/lesmateriaal";
      classes = null;
      return this.courses((function(_this) {
        return function(e, r) {
          if ((r != null) && r.length !== 0) {
            _.last(r).classes(function(e, r) {
              if ((r != null) && r.length !== 0) {
                return classes = r;
              }
            });
          }
          return _this.http.get(url, {}, function(error, result) {
            var u, utilities, _fn, _i, _len;
            if (error != null) {
              return callback(error, null);
            } else {
              utilities = (function() {
                var _i, _len, _ref, _results;
                _ref = EJSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  u = _ref[_i];
                  _results.push(DigitalSchoolUtility._convertRaw(this, u));
                }
                return _results;
              }).call(_this);
              if (classes != null) {
                _fn = function(u) {
                  return u._class = _.find(classes, function(c) {
                    return c.abbreviation() === u._class.Afkorting && c.description() === u._class.Omschrijving;
                  });
                };
                for (_i = 0, _len = utilities.length; _i < _len; _i++) {
                  u = utilities[_i];
                  _fn(u);
                }
              }
              return callback(null, utilities);
            }
          });
        };
      })(this));
    };


    /**
    	 * Returns the profile for the current logged in user.
    	 *
    	 * @method profileInfo
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {Null} Will always be null
    	 *	@param [callback.result] {ProfileInfo} The profile of the current logged in user.
    	 * @return {ProfileInfo} The profile of the current logged in user.
     */

    Magister.prototype.profileInfo = function(callback) {
      this._forceReady();
      if (typeof callback === "function") {
        callback(null, this._profileInfo);
      }
      return this._profileInfo;
    };


    /**
    	 * Returns the children of the current user.
    	 *
    	 * @method children
    	 * @param callback
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {ProfileInfo[]} An array containing ProfileInfo instances.
     */

    Magister.prototype.children = function(callback) {
      return this.http.get("" + this._personUrl + "/kinderen", {}, (function(_this) {
        return function(error, result) {
          var c, parsed, raw, res, _i, _len, _ref;
          if (error != null) {
            return callback(error, null);
          } else {
            parsed = EJSON.parse(result.content);
            if ((parsed.ExceptionId != null) && parsed.Reason === 1) {
              callback(_.extend(parsed, {
                message: "User is not a parent."
              }), null);
              return;
            }
            res = [];
            _ref = parsed.Items;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              raw = _ref[_i];
              c = ProfileInfo._convertRaw(_this, c);
              c._profilePicture = "" + _this.magisterSchool.url + "/api/personen/" + raw.Id + "/foto";
              c.magister(function(callback) {
                var r;
                r = _.clone(_this);
                r._id = raw.Id;
                r._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + r._id;
                r._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + r._id;
                r._profileInfo = c;
                _this.http.get("" + r._personUrl + "/berichten/mappen", {}, function(error, result) {
                  var m;
                  r._messageFolders = (function() {
                    var _j, _len1, _ref1, _results;
                    _ref1 = EJSON.parse(result.content).Items;
                    _results = [];
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                      m = _ref1[_j];
                      _results.push(MessageFolder._convertRaw(r, m));
                    }
                    return _results;
                  })();
                  return callback(r);
                });
                return void 0;
              });
              res.push(c);
            }
            return callback(null, res);
          }
        };
      })(this));
    };


    /**
    	 * Checks if this Magister instance is done logging in.
    	 *
    	 * You can also provide a callback, which will be called when this instance is done logging in.
    	 *
    	 * @method ready
    	 * @param [callback] {Function} The callback which will be called if the current instance is done logging in.
    	 * 	@param [callback.error] {Object} A error that occured when logging onto Magister, if it exists.
    	 *	@param callback.this {Magister} The current Magister object.
    	 * @return {Boolean} Whether or not the current Magister instance is done logging in.
     */

    Magister.prototype.ready = function(callback) {
      if (_.isFunction(callback)) {
        if (this._ready || (this._magisterLoadError != null)) {
          _.bind(callback, this)(this._magisterLoadError);
        } else {
          this._readyCallbacks.push(_.bind(callback, this));
        }
      }
      return this._ready === true;
    };

    Magister.prototype._forceReady = function() {
      if (!this._ready) {
        throw new Error("Not done with logging in! (use Magister.ready(callback) to be sure that logging in is done)");
      }
    };

    Magister.prototype._setReady = function() {
      var callback, _i, _len, _ref;
      this._ready = true;
      _ref = this._readyCallbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        callback();
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._setErrored = function(e) {
      var callback, _i, _len, _ref;
      this._magisterLoadError = e;
      _ref = this._readyCallbacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        callback(this._magisterLoadError);
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._readyCallbacks = [];

    Magister.prototype._magisterLoadError = null;


    /**
    	 * (Re-)Login the current Magister instance.
    	 *
    	 * Usually not needed to call manually.
    	 *
    	 * @method reLogin
    	 * @deprecated
     */

    Magister.prototype.reLogin = function() {
      var url;
      this._ready = false;
      this._magisterLoadError = null;
      url = "" + this.magisterSchool.url + "/api/sessie";
      return this.http.post(url, {
        Gebruikersnaam: this.username,
        Wachtwoord: this.password,
        GebruikersnaamOnthouden: true,
        IngelogdBlijven: this._keepLoggedIn
      }, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return _this._setErrored(error);
          } else {
            _this._sessionId = /[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0];
            _this.http._cookie = "SESSION_ID=" + _this._sessionId + "; M6UserName=" + _this.username;
            return _this.http.get("" + _this.magisterSchool.url + "/api/account", {}, function(error, result) {
              if (error != null) {
                _this._setErrored(error);
                return;
              }
              result = EJSON.parse(result.content);
              _this._group = result.Groep[0];
              _this._id = result.Persoon.Id;
              _this._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + _this._id;
              _this._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + _this._id;
              _this._profileInfo = ProfileInfo._convertRaw(_this, result);
              return _this.http.get("" + _this._personUrl + "/berichten/mappen", {}, function(error, result) {
                var m;
                if (error != null) {
                  _this._setErrored(error);
                  return;
                }
                _this._messageFolders = (function() {
                  var _i, _len, _ref, _results;
                  _ref = EJSON.parse(result.content).Items;
                  _results = [];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    m = _ref[_i];
                    _results.push(MessageFolder._convertRaw(this, m));
                  }
                  return _results;
                }).call(_this);
                return _this._setReady();
              });
            });
          }
        };
      })(this));
    };

    return Magister;

  })();

  messageFolder = function(magisterObj, x) {
    switch (x) {
      case 1:
        return magisterObj.inbox();
      case 2:
        return magisterObj.sentItems();
      case 3:
        return magisterObj.bin();
      case 4:
        return magisterObj.alerts();
      default:
        return MessageFolder._convertRaw({
          Id: x
        });
    }
  };


  /**
   * A Magister message.
   *
   * @class Message
   * @param _magisterObj {Magister} A Magister object this Message is child of.
   * @constructor
   */

  this.Message = (function() {
    function Message(_magisterObj) {
      this._magisterObj = _magisterObj;
      if (this._magisterObj == null) {
        throw new Error("Magister instance is null!");
      }
      this._magisterObj._forceReady();
      this._canSend = true;
      this._sender = this._magisterObj.profileInfo();
      this._recipients = [];
      this._sendDate = new Date();
      this._isRead = false;
      this._type = 1;
      this._subject = "";
      this._body = "";

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property body
      		 * @type String
      		 * @default ""
       */
      this.body = _getset("_body", ((function(_this) {
        return function(x) {
          return _this._body = x.replace("\n", "<br>");
        };
      })(this)), function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "");
        } else {
          return "";
        }
      });

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = _getset("_attachments");

      /**
      		 * The MessageFolder this Message in, changing this will move the Message.
      		 * @property messageFolder
      		 * @type MessageFolder
       */
      this.messageFolder = _getset("_folderId", ((function(_this) {
        return function(x) {
          return _this.move(x);
        };
      })(this)), (function(_this) {
        return function(x) {
          return messageFolder(_this._magisterObj, x);
        };
      })(this));

      /**
      		 * @property subject
      		 * @type String
      		 * @default ""
       */
      this.subject = _getset("_subject", (function(_this) {
        return function(x) {
          return _this._subject = x;
        };
      })(this));

      /**
      		 * @property sender
      		 * @final
      		 * @type Person
       */
      this.sender = _getset("_sender");

      /**
      		 * @property recipients
      		 * @final
      		 * @type Person[]
      		 * @default []
       */
      this.recipients = _getset("_recipients");

      /**
      		 * @property sendDate
      		 * @final
      		 * @type Date
      		 * @default new Date()
       */
      this.sendDate = _getset("_sendDate");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = _getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = _getset("_end");

      /**
      		 * @property isRead
      		 * @type Boolean
      		 * @default false
       */
      this.isRead = _getset("_isRead", (function(_this) {
        return function(x) {
          if (_this._isRead === x || _this._canSend) {
            return;
          }
          _this._isRead = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = _getset("_state");

      /**
      		 * @property isFlagged
      		 * @final
      		 * @type Boolean
       */
      this.isFlagged = _getset("_isFlagged");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = _getset("_type");
    }

    Message.prototype._tasks = 0;

    Message.prototype._sendAfterFinished = false;

    Message.prototype._working = function() {
      return this._tasks !== 0;
    };

    Message.prototype._tickDown = function() {
      if (--this._tasks === 0 && this._sendAfterFinished) {
        return this.send();
      }
    };

    Message.prototype._reset = function() {
      this._tasks = 0;
      return this._sendAfterFinished = false;
    };


    /**
    	 * Adds (a) recipient(s) to the current Message.
    	 *
    	 * @method addRecipient
    	 * @param recipient {String|Person|String[]|Person[]} The recipient(s) to add.
    	 * @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for both Teachers and Pupils.
     */

    Message.prototype.addRecipient = function(recipient, type) {
      var p, _i, _len;
      if (_.isString(recipient)) {
        this._tasks++;
        this._magisterObj.getPersons(recipient, type, (function(_this) {
          return function(e, r) {
            if (r.length !== 0) {
              _this.recipients().push(r[0]);
              return _this._tickDown();
            } else if (type != null) {
              _this._reset();
              throw new Error("Couldn't find a person with the type: \"" + type + "\" and with the query: \"" + recipient + "\"");
            } else {
              _this._reset();
              throw new Error("Couldn't find a person with the query: \"" + recipient + "\"");
            }
          };
        })(this));
      } else if (_.isArray(recipient)) {
        for (_i = 0, _len = recipient.length; _i < _len; _i++) {
          p = recipient[_i];
          this.addRecipient(p, type);
        }
      } else if (_.isObject(recipient)) {
        this.recipients().push(recipient);
      } else {
        this._reset();
        throw new Error("Expected recipient to be a String or an Object, got a(n) " + (typeof recipient));
      }
      return void 0;
    };


    /**
    	 * Sends the current Message. Sending will be delayed if there are processes running in the background.
    	 *
    	 * @method send
    	 * @return {Boolean} False if the sending is delayed, otherwise true.
     */

    Message.prototype.send = function() {
      if (this._working()) {
        this._sendAfterFinished = true;
        return false;
      }
      if (!this._canSend) {
        throw new Error("This message is marked as unsendable");
      }
      if (!((this.recipients() != null) && (this.sender() != null))) {
        throw new Error("Sender and/or recipients cannot be null");
      }
      if (_.isEmpty(this.subject())) {
        throw new Error("Subject cannot be null or empty");
      }
      if (this.body() == null) {
        this.body("");
      }
      this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
      return true;
    };


    /**
    	 * Move the current message to the given position.
    	 *
    	 * @method move
    	 * @param destination {Number|MessageFolder} The MessageFolder of the ID of a MessageFolder or the MessageFolder itself where to move this Message to.
     */

    Message.prototype.move = function(destination) {
      if (_.isObject(destination)) {
        destination = destination.id();
      }
      if (!_.isNumber(destination)) {
        throw new Error("Could not resolve MessageFolder form the given destination.");
      }
      if (this._folderId === destination) {
        return;
      }
      this._folderId = destination;
      return this._update();
    };


    /**
    	 * WARNING. Removes the current Message.
    	 *
    	 * @method remove
     */

    Message.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };

    Message.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/" + (this.id()) + "?berichtSoort=" + (this.type()), this._toMagisterStyle(), {}, (function() {}));
    };

    Message.prototype._toMagisterStyle = function() {
      var obj, p;
      obj = {};
      obj.Id = this._id;
      obj.Inhoud = this._body;
      obj.MapId = this._folderId;
      obj.Onderwerp = this._subject;
      obj.Ontvangers = (function() {
        var _i, _len, _ref, _results;
        _ref = this._recipients;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.VerstuurdOp = this._sendDate;
      obj.Begin = this._begin;
      obj.Einde = this._end;
      obj.IsGelezen = this._isRead;
      obj.Status = this._state;
      obj.HeeftPrioriteit = this._isFlagged;
      obj.Soort = this._type;
      return obj;
    };

    Message._convertRaw = function(magisterObj, raw) {
      var o, obj, _ref;
      obj = new Message(magisterObj);
      obj._id = raw.Id;
      obj._body = (_ref = raw.Inhoud) != null ? _ref : "";
      obj._folderId = raw.MapId;
      obj._subject = raw.Onderwerp;
      obj._sender = Person._convertRaw(magisterObj, raw.Afzender);
      obj._recipients = (function() {
        var _i, _len, _ref1, _ref2, _results;
        _ref2 = (_ref1 = raw.Ontvangers) != null ? _ref1 : [];
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          o = _ref2[_i];
          _results.push(Person._convertRaw(magisterObj, o));
        }
        return _results;
      })();
      obj._sendDate = new Date(Date.parse(raw.VerstuurdOp));
      obj._begin = new Date(Date.parse(raw.Begin));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._isRead = raw.IsGelezen;
      obj._state = raw.Status;
      obj._isFlagged = raw.HeeftPrioriteit;
      obj._type = raw.Soort;
      obj._canSend = false;
      return obj;
    };

    return Message;

  })();

  findQueries = function(queries) {
    var final, numbers, result;
    final = "";
    if (_.any(["unread", "ongelezen"], function(x) {
      return _helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=false";
    } else if (_.any(["read", "gelezen"], function(x) {
      return _helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=true";
    }
    if ((result = /(skip \d+)|(sla \d+ over)/ig.exec(queries)) != null) {
      numbers = /\d+/.exec(result[0])[0];
      final += "&skip=" + numbers;
    }
    return final;
  };


  /**
   * A MessageFolder.
   *
   * @class MessageFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
   * @constructor
   */

  this.MessageFolder = (function() {
    function MessageFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property unreadMessagesCount
      		 * @final
      		 * @type Number
       */
      this.unreadMessagesCount = _getset("_unreadMessagesCount");

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = _getset("_parentId");
    }


    /**
    	 * Gets the Messages of this MessageFolder.
    	 *
    	 * @method messages
    	 * @async
    	 * @param [limit=10] {Number} The limit of the amount of Messages to fetch.
    	 * @param [queries=""] {String} Queries to do on the message (e.g: "unread, skip 5")
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Message[]} An array containing the Messages.
     */

    MessageFolder.prototype.messages = function() {
      var callback, download, limit, queries, url, _ref, _ref1, _ref2;
      limit = (_ref = _.find(arguments, function(a) {
        return _.isNumber(a);
      })) != null ? _ref : 10;
      queries = (_ref1 = _.find(arguments, function(a) {
        return _.isString(a);
      })) != null ? _ref1 : "";
      download = (_ref2 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref2 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback is null");
      }
      if (limit === 0) {
        callback(null, []);
        return void 0;
      }
      url = "" + this._magisterObj._personUrl + "/berichten?mapId=" + (this.id()) + "&top=" + limit + (findQueries(queries));
      return this._magisterObj.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var m, messages, pushMessage, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            messages = (function() {
              var _i, _len, _ref3, _results;
              _ref3 = EJSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                m = _ref3[_i];
                _results.push(Message._convertRaw(this._magisterObj, m));
              }
              return _results;
            }).call(_this);
            pushMessage = _helpers.asyncResultWaiter(messages.length, function(r) {
              return callback(null, _.sortBy(r, function(m) {
                return m.sendDate();
              }).reverse());
            });
            _results = [];
            for (_i = 0, _len = messages.length; _i < _len; _i++) {
              m = messages[_i];
              _results.push((function(m) {
                url = "" + _this._magisterObj._personUrl + "/berichten/" + (m.id()) + "?berichtSoort=" + (m.type());
                return _this._magisterObj.http.get(url, {}, function(error, result) {
                  var a, parsed, pushPeople;
                  parsed = EJSON.parse(result.content);
                  m._body = parsed.Inhoud;
                  m._attachments = (function() {
                    var _j, _len1, _ref3, _ref4, _results1;
                    _ref4 = (_ref3 = parsed.Bijlagen) != null ? _ref3 : [];
                    _results1 = [];
                    for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
                      a = _ref4[_j];
                      _results1.push(File._convertRaw(this._magisterObj, void 0, a));
                    }
                    return _results1;
                  }).call(_this);
                  if (download) {
                    pushPeople = _helpers.asyncResultWaiter(m.recipients().length + 1, function() {
                      return pushMessage(m);
                    });
                    _this._magisterObj.fillPersons(m.recipients(), function(e, r) {
                      m._recipients = r;
                      return pushPeople(r);
                    });
                    return _this._magisterObj.fillPersons(m.sender(), function(e, r) {
                      m._sender = r;
                      return pushPeople(r);
                    });
                  } else {
                    return pushMessage(m);
                  }
                });
              })(m));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders in this MessageFolder that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @async
    	 * @param query {String} A case insensetive query the MessageFolder need to match.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    MessageFolder.prototype.messageFolders = function(query, callback) {
      var _ref;
      callback = (_ref = (callback != null ? callback : query)) != null ? _ref : (function() {});
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/berichten/mappen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var mF, messageFolders;
          if (error != null) {
            return callback(error, null);
          } else {
            messageFolders = (function() {
              var _i, _len, _ref1, _results;
              _ref1 = EJSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                mF = _ref1[_i];
                _results.push(MessageFolder._convertRaw(this._magisterObj, mF));
              }
              return _results;
            }).call(_this);
            if (_.isString(query) && query !== "") {
              result = _.where(messageFolders, function(mF) {
                return Helpers.contains(mF.name(), query, true);
              });
            } else {
              result = messageFolders;
            }
            return callback(null, result);
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes ALL messages from the current MessageFolder.
    	 * @method removeAllMessages
     */

    MessageFolder.prototype.removeAllMessages = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/map/" + (this.id()), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };


    /**
    	 * Creates a new MessageFolder inside of this MessageFolder with the given name.
    	 *
    	 * @method createMessageFolder
    	 * @async
    	 * @param name {String} The name of the MessageFolder.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder} The new MessageFolder.
     */

    MessageFolder.prototype.createMessageFolder = function(name, callback) {
      var folder;
      if (callback == null) {
        callback = function() {};
      }
      folder = {
        naam: name,
        parentId: this.id(),
        persoonId: this._magisterObj._id
      };
      return this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten/mappen", folder, {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, MessageFolder._convertRaw(_this._magisterObj, EJSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes the current MessageFolder.
    	 * @method remove
     */

    MessageFolder.prototype.remove = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/mappen", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };

    MessageFolder.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Naam = this._name;
      obj.OngelezenBerichten = this._unreadMessagesCount;
      obj.Id = this._id;
      obj.ParentId = this._parentId;
      return obj;
    };

    MessageFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new MessageFolder(magisterObj);
      obj._name = raw.Naam;
      obj._unreadMessagesCount = raw.OngelezenBerichten;
      obj._id = raw.Id;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return MessageFolder;

  })();


  /**
   * A Person.
   *
   * @class Person
   * @private
   * @param _magisterObj {Magister} A Magister object this Person is child of.
   * @param _type {Number|String} The type of the Person.
   * @param _firstName {String} The first name of the Person.
   * @param _lastName {String} The last name of the Person.
   * @constructor
   */

  this.Person = (function() {
    function Person(_magisterObj, _type, _firstName, _lastName) {
      this._magisterObj = _magisterObj;
      this._type = _type;
      this._firstName = _firstName;
      this._lastName = _lastName;
      if ((this._firstName != null) && (this._lastName != null)) {
        if (_.any(_.toArray(arguments).slice(2), function(a) {
          return (a != null) && !_.isString(a);
        })) {
          throw new Error("One or more arguments is not a string.");
        }
      }

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property type
      		 * @type String
       */
      this.type = _getset("_type", ((function(_this) {
        return function(val) {
          return _this._type = Person._convertType(val, true);
        };
      })(this)), Person._convertType);

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = _getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = _getset("_lastName");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = _getset("_namePrefix");

      /**
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = _getset("_fullName");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description");

      /**
      		 * @property group
      		 * @final
      		 * @type String
       */
      this.group = _getset("_group");

      /**
      		 * @property teacherCode
      		 * @final
      		 * @type String
       */
      this.teacherCode = _getset("_teacherCode");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = _getset("_emailAddress");
    }

    Person.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.Type = this._type;
      obj.Voornaam = this._firstName;
      obj.Achternaam = this._lastName;
      obj.Tussenvoegsel = this._namePrefix;
      obj.Naam = this._fullName;
      obj.Omschrijving = this._description;
      obj.Groep = this._group;
      obj.Docentcode = this._teacherCode;
      obj.Emailadres = this._emailAddress;
      return obj;
    };

    Person._convertRaw = function(magisterObj, raw) {
      var obj, _ref;
      obj = new Person(magisterObj, raw.Type, raw.Voornaam, raw.Achternaam);
      obj._id = raw.Id;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._fullName = raw.Naam;
      obj._description = (_ref = raw.Omschrijving) != null ? _ref : raw.Naam;
      obj._group = raw.Groep;
      obj._teacherCode = raw.Docentcode;
      obj._emailAddress = raw.Emailadres;
      return obj;
    };

    Person._convertType = function(original, setter) {
      if (setter == null) {
        setter = true;
      }
      if (setter) {
        if (_.isNumber(original)) {
          if (!_.contains([1, 3, 4, 8], original)) {
            throw new Error("Invalid value: \"" + original + "\".");
          }
          return original;
        } else {
          switch (original.toLowerCase()) {
            case "group":
              return 1;
            case "teacher":
              return 3;
            case "pupil":
              return 4;
            case "project":
              return 8;
            default:
              throw new Error("Invalid value: \"" + original + "\".");
          }
        }
      } else {
        switch (original) {
          case 1:
            return "group";
          case 3:
            return "teacher";
          case 4:
            return "pupil";
          case 8:
            return "project";
          default:
            return void 0;
        }
      }
    };

    return Person;

  })();


  /**
   * Information of the logged in user. Or a child.
   *
   * @class ProfileInfo
   * @private
   * @param _magisterObj {Magister} A Magister object this ProfileInfo is child of.
   * @param _firstName {String} The first name of the user.
   * @param _lastName {String} The last name of the user.
   * @param _birthDate {Date} The date of birth of the user.
   * @constructor
   */

  this.ProfileInfo = (function() {
    function ProfileInfo(_magisterObj, _firstName, _lastName, _birthDate) {
      this._magisterObj = _magisterObj;
      this._firstName = _firstName;
      this._lastName = _lastName;
      this._birthDate = _birthDate;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property officialFirstNames
      		 * @final
      		 * @type String
       */
      this.officialFirstNames = _getset("_officialFirstNames");

      /**
      		 * @property initials
      		 * @final
      		 * @type String
       */
      this.initials = _getset("_initials");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = _getset("_namePrefix");

      /**
      		 * @property officialSurname
      		 * @final
      		 * @type String
       */
      this.officialSurname = _getset("_officialSurname");

      /**
      		 * @property birthSurname
      		 * @final
      		 * @type String
       */
      this.birthSurname = _getset("_birthSurname");

      /**
      		 * @property birthNamePrefix
      		 * @final
      		 * @type String
       */
      this.birthNamePrefix = _getset("_birthNamePrefix");

      /**
      		 * @property useBirthname
      		 * @final
      		 * @type Boolean
       */
      this.useBirthname = _getset("_useBirthname");

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = _getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = _getset("_lastName");

      /**
      		 * Equal to firstName() + " " + lastName()
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = function() {
        return this.firstName() + " " + this.lastName();
      };

      /**
      		 * @property birthDate
      		 * @final
      		 * @type Date
       */
      this.birthDate = _getset("_birthDate");
    }


    /**
    	 * The profile picture of the current User.
    	 *
    	 * @method profilePicture
    	 * @param [width=640] The width of the picture.
    	 * @param [height=640] The height of the picture.
    	 * @param [crop=false] Whether or not to crop the image.
    	 * @return {String} The URL to the picture, including the given options.
     */

    ProfileInfo.prototype.profilePicture = function(width, height, crop) {
      if (width == null) {
        width = 640;
      }
      if (height == null) {
        height = 640;
      }
      if (crop == null) {
        crop = false;
      }
      return "" + this._profilePicture + "?width=" + width + "&height=" + height + "&crop=" + crop;
    };

    ProfileInfo._convertRaw = function(magisterObj, raw) {
      var foto, obj;
      foto = magisterObj.magisterSchool.url + _.find(raw.Links, {
        Rel: "Foto"
      }).Href;
      raw = raw.Persoon;
      obj = new ProfileInfo(magisterObj, raw.Roepnaam, raw.Achternaam, new Date(Date.parse(raw.Geboortedatum)));
      obj._id = raw.Id;
      obj._officialFirstNames = raw.OfficieleVoornamen;
      obj._initials = raw.Voorletters;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._officialSurname = raw.OfficieleAchternaam;
      obj._birthSurname = raw.GeboorteAchternaam;
      obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel;
      obj._useBirthname = raw.GebruikGeboortenaam;
      obj._profilePicture = foto;
      return obj;
    };

    return ProfileInfo;

  })();


  /**
   * A Magister school.
   *
   * @class MagisterSchool
   * @param name {String} The name of the school.
   * @param url {String} The URL of the school.
   * @constructor
   */

  this.MagisterSchool = (function() {

    /**
    	 * @property id
    	 * @final
    	 * @type String
     */

    /**
    	 * @property name
    	 * @final
    	 * @type String
     */

    /**
    	 * @property url
    	 * @final
    	 * @type String
     */
    function MagisterSchool(id, name, url) {
      this.id = id;
      this.name = name;
      this.url = url;
    }


    /**
    	 * Gets the schools that matches the given query.
    	 *
    	 * @method getSchools
    	 * @async
    	 * @static
    	 * @param query {String} The query the school should match to. Should be at least 3 chars long.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {MagisterSchool[]} An array containing the MagisterSchools.
     */

    MagisterSchool.getSchools = function(query, callback) {
      if ((query == null) || _helpers.trim(query).length < 3) {
        callback(null, []);
        return;
      }
      return new MagisterHttp().get("https://mijn.magister.net/api/schools?filter=" + query, {}, (function(_this) {
        return function(error, result) {
          var s;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref, _results;
              _ref = EJSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                s = _ref[_i];
                _results.push(this._convertRaw(s));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    MagisterSchool._convertRaw = function(raw) {
      return new MagisterSchool(raw.Id, raw.Name, raw.Url);
    };

    return MagisterSchool;

  })();


  /**
   * A StudyGuide, containing various Files and Links teachers can put on Magister.
   *
   * @class StudyGuide
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
   */

  this.StudyGuide = (function() {
    function StudyGuide(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = _getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = _getset("_to");

      /**
      		 * @property classCodes
      		 * @final
      		 * @type String[]
       */
      this.classCodes = _getset("_classCodes");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property archived
      		 * @final
      		 * @type Boolean
       */
      this.archived = _getset("_archived");
    }


    /**
    	 * Get the parts of this StudyGuide.
    	 *
    	 * @method parts
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {StudyGuidePart[]} The parts of this StudyGuide of the current logged in user.
     */

    StudyGuide.prototype.parts = function(callback) {
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._pupilUrl + "/studiewijzers/" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var id, p, pushResult, _i, _len, _ref, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = EJSON.parse(result.content).Onderdelen.Items;
            pushResult = _helpers.asyncResultWaiter(result.length, function(r) {
              return callback(null, r);
            });
            _ref = (function() {
              var _j, _len, _results1;
              _results1 = [];
              for (_j = 0, _len = result.length; _j < _len; _j++) {
                p = result[_j];
                _results1.push(p.Id);
              }
              return _results1;
            })();
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              id = _ref[_i];
              _results.push(_this._magisterObj.http.get("" + _this._magisterObj._pupilUrl + "/studiewijzers/" + (_this.id()) + "/onderdelen/" + id, {}, function(error, result) {
                return pushResult(StudyGuidePart._convertRaw(_this._magisterObj, EJSON.parse(result.content)));
              }));
            }
            return _results;
          }
        };
      })(this));
    };

    StudyGuide._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new StudyGuide(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._classCodes = raw.VakCodes;
      obj._name = raw.Titel;
      obj._archived = raw.InLeerlingArchief;
      return obj;
    };

    return StudyGuide;

  })();


  /**
   * A part of a StudyGuide.
   *
   * @class StudyGuidePart
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuidePart is child of.
   */

  this.StudyGuidePart = (function() {
    function StudyGuidePart(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = _getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = _getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = _getset("_to");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = _getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = _getset("_description", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "");
        } else {
          return x;
        }
      });

      /**
      		 * @property visible
      		 * @final
      		 * @type Boolean
       */
      this.visible = _getset("_visible");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = _getset("_number");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = _getset("_files");
    }

    StudyGuidePart._convertRaw = function(magisterObj, raw) {
      var f, obj;
      obj = new StudyGuidePart(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._visible = raw.IsZichtbaar;
      obj._number = raw.Volgnummer;
      obj._files = (function() {
        var _i, _len, _ref, _results;
        _ref = raw.Bronnen;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      return obj;
    };

    return StudyGuidePart;

  })();


  /**
   * A utility class containing various helper methods.
   *
   * @static
   * @private
   * @class _helpers
   */

  this._helpers = (function() {
    function _helpers() {}


    /**
    	 * Adds a zero in front of the original number if it doesn't yet.
    	 *
    	 * @method addZero
    	 * @param original {Number} The number to add a zero in front to.
    	 * @return {String} The number as string with a zero in front of it.
     */

    _helpers.addZero = function(original) {
      if (original < 10) {
        return "0" + original;
      } else {
        return original.toString();
      }
    };

    _helpers.toUtcString = function(d) {
      return "" + (_helpers.addZero(d.getUTCFullYear())) + "-" + (_helpers.addZero(d.getMonth() + 1)) + "-" + (_helpers.addZero(d.getDate())) + "T" + (_helpers.addZero(d.getHours())) + ":" + (_helpers.addZero(d.getMinutes())) + ":" + (_helpers.addZero(d.getSeconds())) + ".0000000Z";
    };

    _helpers.pushMore = function(arr, items) {
      [].push.apply(arr, items);
      return arr;
    };


    /**
    	 * Checks if the given original string contains the given query string.
    	 *
    	 * @method contains
    	 * @param original {String} The original string to search in.
    	 * @param query {String} The string to search for.
    	 * @param ignoreCasing {Boolean} Whether to ignore the casing of the search.
    	 * @return {Boolean} Whether the original string contains the query string.
     */

    _helpers.contains = function(original, query, ignoreCasing) {
      if (ignoreCasing == null) {
        ignoreCasing = false;
      }
      if (ignoreCasing) {
        return original.toUpperCase().indexOf(query.toUpperCase()) >= 0;
      } else {
        return original.indexOf(query) >= 0;
      }
    };


    /**
    	 * Returns a function which requires a result, when all results are pushed the callback is called with the result.
    	 *
    	 * @method asyncResultWaiter
    	 * @param amount {Number} The amount of results needed before the callback is called.
    	 * @param callback {Function} The callback which will be called when all the results are pushed.
    	 * @return {Function} The function which should be called with the reuslts.
     */

    _helpers.asyncResultWaiter = function(amount, callback) {
      var left, results;
      if (amount === 0) {
        callback([]);
      }
      results = [];
      left = amount;
      return function(result) {
        if (_.isArray(result)) {
          _helpers.pushMore(results, result);
          left -= result.length;
        } else {
          results.push(result);
          left--;
        }
        if (left === 0) {
          return callback(results);
        }
      };
    };

    _helpers.trim = function(original) {
      if (!((original != null) && original.length !== 0)) {
        return "";
      }
      if (_.isFunction(String.prototype.trim)) {
        return original.trim();
      } else {
        return original.replace(/^\s+|\s+$/g, "");
      }
    };

    _helpers.saveFile = function(rawData, mime, name) {
      try {
        return saveAs(new Blob([rawData], {
          type: mime
        }), name);
      } catch (_error) {}
    };

    _helpers.urlDateConvert = function(date) {
      return "" + (date.getUTCFullYear()) + "-" + (_helpers.addZero(date.getMonth() + 1)) + "-" + (_helpers.addZero(date.getDate()));
    };

    _helpers.date = function(date) {
      return new Date(date.getUTCFullYear(), date.getMonth(), date.getDate());
    };

    return _helpers;

  })();

  this._getset = function(varName, setter, getter) {
    return function(newVar) {
      if (newVar != null) {
        if (_.isFunction(setter)) {
          setter(newVar, true);
        } else {
          throw new Error("Changes on this property aren't allowed");
        }
      }
      if (_.isFunction(getter)) {
        return getter(this[varName], false);
      } else {
        return this[varName];
      }
    };
  };

  if (Array.isArray == null) {
    _.isArray = jQuery.isArray = Array.isArray = function(x) {
      return Object.prototype.toString.call(x === "[object Array]");
    };
  }


  /*
  @_getset = (varName, setter, getter) ->
  	return (newVar) ->
  		if newVar?
  			if _.isFunction(setter) then setter(newVar, _.toArray(arguments)[1..], yes)
  			else throw new Error "Changes on this property aren't allowed"
  		return if _.isFunction(getter) then getter(@[varName], _.toArray(arguments)[1..], no) else @[varName]
   */

  ;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var i=e[u],a=r[u];if(i!==a){if(i>a||typeof i=="undefined")return 1;if(i<a||typeof a=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],i=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&i&&typeof i=="object")return false;for(u=f(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=f(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function i(n){return"\\"+U[n]
}function a(){return h.pop()||[]}function f(){return g.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var t=n.l;t&&c(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,g.length<_&&g.push(n)}function p(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];return u}function s(e){function h(n,t,e){if(!n||!V[typeof n])return n;
t=t&&typeof e=="undefined"?t:tt(t,e,3);for(var r=-1,u=V[typeof n]&&Fe(n),o=u?u.length:0;++r<o&&(e=u[r],false!==t(n[e],e,n)););return n}function g(n,t,e){var r;if(!n||!V[typeof n])return n;t=t&&typeof e=="undefined"?t:tt(t,e,3);for(r in n)if(false===t(n[r],r,n))break;return n}function _(n,t,e){var r,u=n,o=u;if(!u)return o;for(var i=arguments,a=0,f=typeof e=="number"?2:i.length;++a<f;)if((u=i[a])&&V[typeof u])for(var l=-1,c=V[typeof u]&&Fe(u),p=c?c.length:0;++l<p;)r=c[l],"undefined"==typeof o[r]&&(o[r]=u[r]);
return o}function U(n,t,e){var r,u=n,o=u;if(!u)return o;var i=arguments,a=0,f=typeof e=="number"?2:i.length;if(3<f&&"function"==typeof i[f-2])var l=tt(i[--f-1],i[f--],2);else 2<f&&"function"==typeof i[f-1]&&(l=i[--f]);for(;++a<f;)if((u=i[a])&&V[typeof u])for(var c=-1,p=V[typeof u]&&Fe(u),s=p?p.length:0;++c<s;)r=p[c],o[r]=l?l(o[r],u[r]):u[r];return o}function H(n){var t,e=[];if(!n||!V[typeof n])return e;for(t in n)me.call(n,t)&&e.push(t);return e}function J(n){return n&&typeof n=="object"&&!Te(n)&&me.call(n,"__wrapped__")?n:new Q(n)
}function Q(n,t){this.__chain__=!!t,this.__wrapped__=n}function X(n){function t(){if(r){var n=p(r);be.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return wt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return $e(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!wt(n))return n;var i=ce.call(n);if(!K[i])return n;var f=Ae[i];switch(i){case T:case F:return new f(+n);case W:case P:return new f(n);case z:return o=f(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o
}if(i=Te(n),t){var c=!r;r||(r=a()),u||(u=a());for(var s=r.length;s--;)if(r[s]==n)return u[s];o=i?f(n.length):{}}else o=i?p(n):U({},n);return i&&(me.call(n,"index")&&(o.index=n.index),me.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(i?St:h)(n,function(n,i){o[i]=Z(n,t,e,r,u)}),c&&(l(r),l(u)),o):o}function nt(n){return wt(n)?ke(n):{}}function tt(n,t,e){if(typeof n!="function")return Ut;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(De.funcNames&&(r=!n.name),r=r||!De.funcDecomp,!r)){var u=ge.call(n);
De.funcNames||(r=!O.test(u)),r||(r=E.test(u),$e(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=f?i:this;if(u){var h=p(u);be.apply(h,arguments)}return(o||c)&&(h||(h=p(arguments)),o&&be.apply(h,o),c&&h.length<a)?(r|=16,et([e,s?r:-4&r,h,null,i,a])):(h||(h=arguments),l&&(e=n[v]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),wt(h)?h:n):e.apply(n,h))
}var e=n[0],r=n[1],u=n[2],o=n[3],i=n[4],a=n[5],f=1&r,l=2&r,c=4&r,s=8&r,v=e;return $e(t,n),t}function rt(e,r){var u=-1,i=st(),a=e?e.length:0,f=a>=b&&i===n,l=[];if(f){var p=o(r);p?(i=t,r=p):f=false}for(;++u<a;)p=e[u],0>i(r,p)&&l.push(p);return f&&c(r),l}function ut(n,t,e,r){r=(r||0)-1;for(var u=n?n.length:0,o=[];++r<u;){var i=n[r];if(i&&typeof i=="object"&&typeof i.length=="number"&&(Te(i)||yt(i))){t||(i=ut(i,t,e));var a=-1,f=i.length,l=o.length;for(o.length+=f;++a<f;)o[l++]=i[a]}else e||o.push(i)}return o
}function ot(n,t,e,r,u,o){if(e){var i=e(n,t);if(typeof i!="undefined")return!!i}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&V[typeof n]||t&&V[typeof t]))return false;if(null==n||null==t)return n===t;var f=ce.call(n),c=ce.call(t);if(f==D&&(f=q),c==D&&(c=q),f!=c)return false;switch(f){case T:case F:return+n==+t;case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case z:case P:return n==oe(t)}if(c=f==$,!c){var p=me.call(n,"__wrapped__"),s=me.call(t,"__wrapped__");if(p||s)return ot(p?n.__wrapped__:n,s?t.__wrapped__:t,e,r,u,o);
if(f!=q)return false;if(f=n.constructor,p=t.constructor,f!=p&&!(dt(f)&&f instanceof f&&dt(p)&&p instanceof p)&&"constructor"in n&&"constructor"in t)return false}for(f=!u,u||(u=a()),o||(o=a()),p=u.length;p--;)if(u[p]==n)return o[p]==t;var v=0,i=true;if(u.push(n),o.push(t),c){if(p=n.length,v=t.length,(i=v==p)||r)for(;v--;)if(c=p,s=t[v],r)for(;c--&&!(i=ot(n[c],s,e,r,u,o)););else if(!(i=ot(n[v],s,e,r,u,o)))break}else g(t,function(t,a,f){return me.call(f,a)?(v++,i=me.call(n,a)&&ot(n[a],t,e,r,u,o)):void 0}),i&&!r&&g(n,function(n,t,e){return me.call(e,t)?i=-1<--v:void 0
});return u.pop(),o.pop(),f&&(l(u),l(o)),i}function it(n,t,e,r,u){(Te(t)?St:h)(t,function(t,o){var i,a,f=t,l=n[o];if(t&&((a=Te(t))||Pe(t))){for(f=r.length;f--;)if(i=r[f]==t){l=u[f];break}if(!i){var c;e&&(f=e(l,t),c=typeof f!="undefined")&&(l=f),c||(l=a?Te(l)?l:[]:Pe(l)?l:{}),r.push(t),u.push(l),c||it(l,t,e,r,u)}}else e&&(f=e(l,t),typeof f=="undefined"&&(f=t)),typeof f!="undefined"&&(l=f);n[o]=l})}function at(n,t){return n+he(Re()*(t-n+1))}function ft(e,r,u){var i=-1,f=st(),p=e?e.length:0,s=[],v=!r&&p>=b&&f===n,h=u||v?a():s;
for(v&&(h=o(h),f=t);++i<p;){var g=e[i],y=u?u(g,i,e):g;(r?!i||h[h.length-1]!==y:0>f(h,y))&&((u||v)&&h.push(y),s.push(g))}return v?(l(h.k),c(h)):u&&l(h),s}function lt(n){return function(t,e,r){var u={};e=J.createCallback(e,r,3),r=-1;var o=t?t.length:0;if(typeof o=="number")for(;++r<o;){var i=t[r];n(u,i,e(i,r,t),t)}else h(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function ct(n,t,e,r,u,o){var i=1&t,a=4&t,f=16&t,l=32&t;if(!(2&t||dt(n)))throw new ie;f&&!e.length&&(t&=-17,f=e=false),l&&!r.length&&(t&=-33,l=r=false);
var c=n&&n.__bindData__;return c&&true!==c?(c=p(c),c[2]&&(c[2]=p(c[2])),c[3]&&(c[3]=p(c[3])),!i||1&c[1]||(c[4]=u),!i&&1&c[1]&&(t|=8),!a||4&c[1]||(c[5]=o),f&&be.apply(c[2]||(c[2]=[]),e),l&&we.apply(c[3]||(c[3]=[]),r),c[1]|=t,ct.apply(null,c)):(1==t||17===t?X:et)([n,t,e,r,u,o])}function pt(n){return Be[n]}function st(){var t=(t=J.indexOf)===Wt?n:t;return t}function vt(n){return typeof n=="function"&&pe.test(n)}function ht(n){var t,e;return n&&ce.call(n)==q&&(t=n.constructor,!dt(t)||t instanceof t)?(g(n,function(n,t){e=t
}),typeof e=="undefined"||me.call(n,e)):false}function gt(n){return We[n]}function yt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==D||false}function mt(n,t,e){var r=Fe(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function bt(n){var t=[];return g(n,function(n,e){dt(n)&&t.push(e)}),t.sort()}function _t(n){for(var t=-1,e=Fe(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function dt(n){return typeof n=="function"}function wt(n){return!(!n||!V[typeof n])
}function jt(n){return typeof n=="number"||n&&typeof n=="object"&&ce.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&ce.call(n)==P||false}function xt(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;)u[t]=n[e[t]];return u}function Ct(n,t,e){var r=-1,u=st(),o=n?n.length:0,i=false;return e=(0>e?Ie(0,o+e):e)||0,Te(n)?i=-1<u(n,t,e):typeof o=="number"?i=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):h(n,function(n){return++r<e?void 0:!(i=n===t)}),i}function Ot(n,t,e){var r=true;t=J.createCallback(t,e,3),e=-1;
var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&(r=!!t(n[e],e,n)););else h(n,function(n,e,u){return r=!!t(n,e,u)});return r}function Nt(n,t,e){var r=[];t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}else h(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){t=J.createCallback(t,e,3),e=-1;var r=n?n.length:0;if(typeof r!="number"){var u;return h(n,function(n,e,r){return t(n,e,r)?(u=n,false):void 0}),u}for(;++e<r;){var o=n[e];
if(t(o,e,n))return o}}function St(n,t,e){var r=-1,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof u=="number")for(;++r<u&&false!==t(n[r],r,n););else h(n,t);return n}function Et(n,t,e){var r=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),typeof r=="number")for(;r--&&false!==t(n[r],r,n););else{var u=Fe(n),r=u.length;h(n,function(n,e,o){return e=u?u[--r]:--r,t(o[e],e,o)})}return n}function Rt(n,t,e){var r=-1,u=n?n.length:0;if(t=J.createCallback(t,e,3),typeof u=="number")for(var o=Xt(u);++r<u;)o[r]=t(n[r],r,n);
else o=[],h(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function At(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a>o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Dt(n,t,e,r){if(!n)return e;var u=3>arguments.length;t=J.createCallback(t,r,4);var o=-1,i=n.length;if(typeof i=="number")for(u&&(e=n[++o]);++o<i;)e=t(e,n[o],o,n);else h(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)
});return e}function $t(n,t,e,r){var u=3>arguments.length;return t=J.createCallback(t,r,4),Et(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Xt(typeof e=="number"?e:0);return St(n,function(n){var e=at(0,++t);r[t]=r[e],r[e]=n}),r}function Ft(n,t,e){var r;t=J.createCallback(t,e,3),e=-1;var u=n?n.length:0;if(typeof u=="number")for(;++e<u&&!(r=t(n[e],e,n)););else h(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Bt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;
for(t=J.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:v;return p(n,0,Se(Ie(0,r),u))}function Wt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Ie(0,u+r):r||0}else if(r)return r=zt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=J.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Ie(0,t);return p(n,r)}function zt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?J.createCallback(e,r,1):Ut,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Pt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=J.createCallback(e,r,3)),ft(n,t,e)}function Kt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?At(Ve(n,"length")):0,r=Xt(0>e?0:e);++t<e;)r[t]=Ve(n,t);return r}function Lt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||Te(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?ct(n,17,p(arguments,2),null,t):ct(n,1,null,null,t)
}function Vt(n,t,e){function r(){c&&ve(c),i=c=p=v,(g||h!==t)&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null))}function u(){var e=t-(Ue()-f);0<e?c=_e(u,e):(i&&ve(i),e=p,i=c=p=v,e&&(s=Ue(),a=n.apply(l,o),c||i||(o=l=null)))}var o,i,a,f,l,c,p,s=0,h=false,g=true;if(!dt(n))throw new ie;if(t=Ie(0,t)||0,true===e)var y=true,g=false;else wt(e)&&(y=e.leading,h="maxWait"in e&&(Ie(t,e.maxWait)||0),g="trailing"in e?e.trailing:g);return function(){if(o=arguments,f=Ue(),l=this,p=g&&(c||!y),false===h)var e=y&&!c;else{i||y||(s=f);var v=h-(f-s),m=0>=v;
m?(i&&(i=ve(i)),s=f,a=n.apply(l,o)):i||(i=_e(r,v))}return m&&c?c=ve(c):c||t===h||(c=_e(u,t)),e&&(m=true,a=n.apply(l,o)),!m||c||i||(o=l=null),a}}function Ut(n){return n}function Gt(n,t,e){var r=true,u=t&&bt(t);t&&(e||u.length)||(null==e&&(e=t),o=Q,t=n,n=J,u=bt(t)),false===e?r=false:wt(e)&&"chain"in e&&(r=e.chain);var o=n,i=dt(o);St(u,function(e){var u=n[e]=t[e];i&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,i=[e];if(be.apply(i,arguments),i=u.apply(n,i),r||t){if(e===i&&wt(i))return this;
i=new o(i),i.__chain__=t}return i})})}function Ht(){}function Jt(n){return function(t){return t[n]}}function Qt(){return this.__wrapped__}e=e?Y.defaults(G.Object(),e,Y.pick(G,A)):G;var Xt=e.Array,Yt=e.Boolean,Zt=e.Date,ne=e.Function,te=e.Math,ee=e.Number,re=e.Object,ue=e.RegExp,oe=e.String,ie=e.TypeError,ae=[],fe=re.prototype,le=e._,ce=fe.toString,pe=ue("^"+oe(ce).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),se=te.ceil,ve=e.clearTimeout,he=te.floor,ge=ne.prototype.toString,ye=vt(ye=re.getPrototypeOf)&&ye,me=fe.hasOwnProperty,be=ae.push,_e=e.setTimeout,de=ae.splice,we=ae.unshift,je=function(){try{var n={},t=vt(t=re.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),ke=vt(ke=re.create)&&ke,xe=vt(xe=Xt.isArray)&&xe,Ce=e.isFinite,Oe=e.isNaN,Ne=vt(Ne=re.keys)&&Ne,Ie=te.max,Se=te.min,Ee=e.parseInt,Re=te.random,Ae={};Ae[$]=Xt,Ae[T]=Yt,Ae[F]=Zt,Ae[B]=ne,Ae[q]=re,Ae[W]=ee,Ae[z]=ue,Ae[P]=oe,Q.prototype=J.prototype;var De=J.support={};De.funcDecomp=!vt(e.a)&&E.test(s),De.funcNames=typeof ne.name=="string",J.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,variable:"",imports:{_:J}},ke||(nt=function(){function n(){}return function(t){if(wt(t)){n.prototype=t;
var r=new n;n.prototype=null}return r||e.Object()}}());var $e=je?function(n,t){M.value=t,je(n,"__bindData__",M)}:Ht,Te=xe||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&ce.call(n)==$||false},Fe=Ne?function(n){return wt(n)?Ne(n):[]}:H,Be={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},We=_t(Be),qe=ue("("+Fe(We).join("|")+")","g"),ze=ue("["+Fe(Be).join("")+"]","g"),Pe=ye?function(n){if(!n||ce.call(n)!=q)return false;var t=n.valueOf,e=vt(t)&&(e=ye(t))&&ye(e);return e?n==e||ye(n)==e:ht(n)
}:ht,Ke=lt(function(n,t,e){me.call(n,e)?n[e]++:n[e]=1}),Le=lt(function(n,t,e){(me.call(n,e)?n[e]:n[e]=[]).push(t)}),Me=lt(function(n,t,e){n[e]=t}),Ve=Rt,Ue=vt(Ue=Zt.now)&&Ue||function(){return(new Zt).getTime()},Ge=8==Ee(d+"08")?Ee:function(n,t){return Ee(kt(n)?n.replace(I,""):n,t||0)};return J.after=function(n,t){if(!dt(t))throw new ie;return function(){return 1>--n?t.apply(this,arguments):void 0}},J.assign=U,J.at=function(n){for(var t=arguments,e=-1,r=ut(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Xt(t);++e<t;)u[e]=n[r[e]];
return u},J.bind=Mt,J.bindAll=function(n){for(var t=1<arguments.length?ut(arguments,true,false,1):bt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=ct(n[u],1,null,null,n)}return n},J.bindKey=function(n,t){return 2<arguments.length?ct(t,19,p(arguments,2),null,n):ct(t,3,null,null,n)},J.chain=function(n){return n=new Q(n),n.__chain__=true,n},J.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},J.compose=function(){for(var n=arguments,t=n.length;t--;)if(!dt(n[t]))throw new ie;
return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},J.constant=function(n){return function(){return n}},J.countBy=Ke,J.create=function(n,t){var e=nt(n);return t?U(e,t):e},J.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);if("object"!=r)return Jt(n);var u=Fe(n),o=u[0],i=n[o];return 1!=u.length||i!==i||wt(i)?function(t){for(var e=u.length,r=false;e--&&(r=ot(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],i===n&&(0!==i||1/i==1/n)
}},J.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,ct(n,4,null,null,null,t)},J.debounce=Vt,J.defaults=_,J.defer=function(n){if(!dt(n))throw new ie;var t=p(arguments,1);return _e(function(){n.apply(v,t)},1)},J.delay=function(n,t){if(!dt(n))throw new ie;var e=p(arguments,2);return _e(function(){n.apply(v,e)},t)},J.difference=function(n){return rt(n,ut(arguments,true,true,1))},J.filter=Nt,J.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Rt(n,e,r)),ut(n,t)
},J.forEach=St,J.forEachRight=Et,J.forIn=g,J.forInRight=function(n,t,e){var r=[];g(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},J.forOwn=h,J.forOwnRight=mt,J.functions=bt,J.groupBy=Le,J.indexBy=Me,J.initial=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,Se(Ie(0,u-r),u))},J.intersection=function(){for(var e=[],r=-1,u=arguments.length,i=a(),f=st(),p=f===n,s=a();++r<u;){var v=arguments[r];
(Te(v)||yt(v))&&(e.push(v),i.push(p&&v.length>=b&&o(r?e[r]:s)))}var p=e[0],h=-1,g=p?p.length:0,y=[];n:for(;++h<g;){var m=i[0],v=p[h];if(0>(m?t(m,v):f(s,v))){for(r=u,(m||s).push(v);--r;)if(m=i[r],0>(m?t(m,v):f(e[r],v)))continue n;y.push(v)}}for(;u--;)(m=i[u])&&c(m);return l(i),l(s),y},J.invert=_t,J.invoke=function(n,t){var e=p(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,i=Xt(typeof o=="number"?o:0);return St(n,function(n){i[++r]=(u?t:n[t]).apply(n,e)}),i},J.keys=Fe,J.map=Rt,J.mapValues=function(n,t,e){var r={};
return t=J.createCallback(t,e,3),h(n,function(n,e,u){r[e]=t(n,e,u)}),r},J.max=At,J.memoize=function(n,t){function e(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return me.call(r,u)?r[u]:r[u]=n.apply(this,arguments)}if(!dt(n))throw new ie;return e.cache={},e},J.merge=function(n){var t=arguments,e=2;if(!wt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=p(arguments,1,e),u=-1,o=a(),i=a();++u<e;)it(n,t[u],r,o,i);
return l(o),l(i),n},J.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&Te(n)){e=-1;for(var i=n.length;++e<i;){var a=n[e];a<o&&(o=a)}}else t=null==t&&kt(n)?r:J.createCallback(t,e,3),St(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)});return o},J.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];g(n,function(n,t){u.push(t)});for(var u=rt(u,ut(arguments,true,false,1)),o=-1,i=u.length;++o<i;){var a=u[o];r[a]=n[a]}}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)||(r[e]=n)
});return r},J.once=function(n){var t,e;if(!dt(n))throw new ie;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},J.pairs=function(n){for(var t=-1,e=Fe(n),r=e.length,u=Xt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u},J.partial=function(n){return ct(n,16,p(arguments,1))},J.partialRight=function(n){return ct(n,32,null,p(arguments,1))},J.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ut(arguments,true,false,1),i=wt(n)?o.length:0;++u<i;){var a=o[u];a in n&&(r[a]=n[a])
}else t=J.createCallback(t,e,3),g(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},J.pluck=Ve,J.property=Jt,J.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,i=t[e];++o<u;)n[o]===i&&(de.call(n,o--,1),u--);return n},J.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Ie(0,se((t-n)/(e||1)));for(var u=Xt(t);++r<t;)u[r]=n,n+=e;return u},J.reject=function(n,t,e){return t=J.createCallback(t,e,3),Nt(n,function(n,e,r){return!t(n,e,r)
})},J.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=J.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),de.call(n,r--,1),u--);return o},J.rest=qt,J.shuffle=Tt,J.sortBy=function(n,t,e){var r=-1,o=Te(t),i=n?n.length:0,p=Xt(typeof i=="number"?i:0);for(o||(t=J.createCallback(t,e,3)),St(n,function(n,e,u){var i=p[++r]=f();o?i.m=Rt(t,function(t){return n[t]}):(i.m=a())[0]=t(n,e,u),i.n=r,i.o=n}),i=p.length,p.sort(u);i--;)n=p[i],p[i]=n.o,o||l(n.m),c(n);return p},J.tap=function(n,t){return t(n),n
},J.throttle=function(n,t,e){var r=true,u=true;if(!dt(n))throw new ie;return false===e?r=false:wt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),L.leading=r,L.maxWait=t,L.trailing=u,Vt(n,t,L)},J.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Xt(n);for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},J.toArray=function(n){return n&&typeof n.length=="number"?p(n):xt(n)},J.transform=function(n,t,e,r){var u=Te(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=J.createCallback(t,r,4),(u?St:h)(n,function(n,r,u){return t(e,n,r,u)
})),e},J.union=function(){return ft(ut(arguments,true,true))},J.uniq=Pt,J.values=xt,J.where=Nt,J.without=function(n){return rt(n,p(arguments,1))},J.wrap=function(n,t){return ct(t,16,[n])},J.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(Te(e)||yt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},J.zip=Kt,J.zipObject=Lt,J.collect=Rt,J.drop=qt,J.each=St,J.eachRight=Et,J.extend=U,J.methods=bt,J.object=Lt,J.select=Nt,J.tail=qt,J.unique=Pt,J.unzip=Kt,Gt(J),J.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Z(n,t,typeof e=="function"&&tt(e,r,1))
},J.cloneDeep=function(n,t,e){return Z(n,true,typeof t=="function"&&tt(t,e,1))},J.contains=Ct,J.escape=function(n){return null==n?"":oe(n).replace(ze,pt)},J.every=Ot,J.find=It,J.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=J.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},J.findKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),h(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.findLast=function(n,t,e){var r;return t=J.createCallback(t,e,3),Et(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0
}),r},J.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=J.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1},J.findLastKey=function(n,t,e){var r;return t=J.createCallback(t,e,3),mt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},J.has=function(n,t){return n?me.call(n,t):false},J.identity=Ut,J.indexOf=Wt,J.isArguments=yt,J.isArray=Te,J.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&ce.call(n)==T||false},J.isDate=function(n){return n&&typeof n=="object"&&ce.call(n)==F||false
},J.isElement=function(n){return n&&1===n.nodeType||false},J.isEmpty=function(n){var t=true;if(!n)return t;var e=ce.call(n),r=n.length;return e==$||e==P||e==D||e==q&&typeof r=="number"&&dt(n.splice)?!r:(h(n,function(){return t=false}),t)},J.isEqual=function(n,t,e,r){return ot(n,t,typeof e=="function"&&tt(e,r,2))},J.isFinite=function(n){return Ce(n)&&!Oe(parseFloat(n))},J.isFunction=dt,J.isNaN=function(n){return jt(n)&&n!=+n},J.isNull=function(n){return null===n},J.isNumber=jt,J.isObject=wt,J.isPlainObject=Pe,J.isRegExp=function(n){return n&&typeof n=="object"&&ce.call(n)==z||false
},J.isString=kt,J.isUndefined=function(n){return typeof n=="undefined"},J.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Ie(0,r+e):Se(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},J.mixin=Gt,J.noConflict=function(){return e._=le,this},J.noop=Ht,J.now=Ue,J.parseInt=Ge,J.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Re(),Se(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):at(n,t)
},J.reduce=Dt,J.reduceRight=$t,J.result=function(n,t){if(n){var e=n[t];return dt(e)?n[t]():e}},J.runInContext=s,J.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:Fe(n).length},J.some=Ft,J.sortedIndex=zt,J.template=function(n,t,e){var r=J.templateSettings;n=oe(n||""),e=_({},e,r);var u,o=_({},e.imports,r.imports),r=Fe(o),o=xt(o),a=0,f=e.interpolate||S,l="__p+='",f=ue((e.escape||S).source+"|"+f.source+"|"+(f===N?x:S).source+"|"+(e.evaluate||S).source+"|$","g");n.replace(f,function(t,e,r,o,f,c){return r||(r=o),l+=n.slice(a,c).replace(R,i),e&&(l+="'+__e("+e+")+'"),f&&(u=true,l+="';"+f+";\n__p+='"),r&&(l+="'+((__t=("+r+"))==null?'':__t)+'"),a=c+t.length,t
}),l+="';",f=e=e.variable,f||(e="obj",l="with("+e+"){"+l+"}"),l=(u?l.replace(w,""):l).replace(j,"$1").replace(k,"$1;"),l="function("+e+"){"+(f?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}";try{var c=ne(r,"return "+l).apply(v,o)}catch(p){throw p.source=l,p}return t?c(t):(c.source=l,c)},J.unescape=function(n){return null==n?"":oe(n).replace(qe,gt)},J.uniqueId=function(n){var t=++y;return oe(null==n?"":n)+t
},J.all=Ot,J.any=Ft,J.detect=It,J.findWhere=It,J.foldl=Dt,J.foldr=$t,J.include=Ct,J.inject=Dt,Gt(function(){var n={};return h(J,function(t,e){J.prototype[e]||(n[e]=t)}),n}(),false),J.first=Bt,J.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=J.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:v;return p(n,Ie(0,u-r))},J.sample=function(n,t,e){return n&&typeof n.length!="number"&&(n=xt(n)),null==t||e?n?n[at(0,n.length-1)]:v:(n=Tt(n),n.length=Se(Ie(0,t),n.length),n)
},J.take=Bt,J.head=Bt,h(J,function(n,t){var e="sample"!==t;J.prototype[t]||(J.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new Q(o,u):o})}),J.VERSION="2.4.1",J.prototype.chain=function(){return this.__chain__=true,this},J.prototype.toString=function(){return oe(this.__wrapped__)},J.prototype.value=Qt,J.prototype.valueOf=Qt,St(["join","pop","shift"],function(n){var t=ae[n];J.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new Q(e,n):e}}),St(["push","reverse","sort","unshift"],function(n){var t=ae[n];J.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),St(["concat","slice","splice"],function(n){var t=ae[n];J.prototype[n]=function(){return new Q(t.apply(this.__wrapped__,arguments),this.__chain__)}}),J}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p\+='';/g,j=/\b(__p\+=)''\+/g,k=/(__e\(.*?\)|\b__t\))\+'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,I=RegExp("^["+d+"]*0+(?=.$)"),S=/($^)/,E=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,A="Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),D="[object Arguments]",$="[object Array]",T="[object Boolean]",F="[object Date]",B="[object Function]",W="[object Number]",q="[object Object]",z="[object RegExp]",P="[object String]",K={};
K[B]=false,K[D]=K[$]=K[T]=K[F]=K[W]=K[q]=K[z]=K[P]=true;var L={leading:false,maxWait:0,trailing:false},M={configurable:false,enumerable:false,value:null,writable:false},V={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},U={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},G=V[typeof window]&&window||this,H=V[typeof exports]&&exports&&!exports.nodeType&&exports,J=V[typeof module]&&module&&!module.nodeType&&module,Q=J&&J.exports===H&&H,X=V[typeof global]&&global;!X||X.global!==X&&X.window!==X||(G=X);
var Y=s();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(G._=Y, define(function(){return Y})):H&&J?Q?(J.exports=Y)._=Y:H._=Y:G._=Y}).call(this);;

  for(var BASE_64_CHARS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",BASE_64_VALS={},i=0;i<BASE_64_CHARS.length;i++)BASE_64_VALS[BASE_64_CHARS.charAt(i)]=i;Base64={},Base64.encode=function(a){if("string"==typeof a){var b=a;a=Base64.newBinary(b.length);for(var c=0;c<b.length;c++){var d=b.charCodeAt(c);if(d>255)throw new Error("Not ascii. Base64.encode can only take ascii strings.");a[c]=d}}for(var e=[],f=null,g=null,h=null,i=null,c=0;c<a.length;c++)switch(c%3){case 0:f=63&a[c]>>2,g=(3&a[c])<<4;break;case 1:g|=15&a[c]>>4,h=(15&a[c])<<2;break;case 2:h|=3&a[c]>>6,i=63&a[c],e.push(getChar(f)),e.push(getChar(g)),e.push(getChar(h)),e.push(getChar(i)),f=null,g=null,h=null,i=null}return null!=f&&(e.push(getChar(f)),e.push(getChar(g)),null==h?e.push("="):e.push(getChar(h)),null==i&&e.push("=")),e.join("")};var getChar=function(a){return BASE_64_CHARS.charAt(a)},getVal=function(a){return"="===a?-1:BASE_64_VALS[a]};Base64.newBinary=function(a){if("undefined"==typeof Uint8Array||"undefined"==typeof ArrayBuffer){for(var b=[],c=0;a>c;c++)b.push(0);return b.$Uint8ArrayPolyfill=!0,b}return new Uint8Array(new ArrayBuffer(a))},Base64.decode=function(a){var b=Math.floor(3*a.length/4);"="==a.charAt(a.length-1)&&(b--,"="==a.charAt(a.length-2)&&b--);for(var c=Base64.newBinary(b),d=null,e=null,f=null,g=0,h=0;h<a.length;h++){var i=a.charAt(h),j=getVal(i);switch(h%4){case 0:if(0>j)throw new Error("invalid base64 string");d=j<<2;break;case 1:if(0>j)throw new Error("invalid base64 string");d|=j>>4,c[g++]=d,e=(15&j)<<4;break;case 2:j>=0&&(e|=j>>2,c[g++]=e,f=(3&j)<<6);break;case 3:j>=0&&(c[g++]=f|j)}}return c};EJSON={},EJSONTest={};var customTypes={};EJSON.addType=function(a,b){if(_.has(customTypes,a))throw new Error("Type "+a+" already present");customTypes[a]=b};var isInfOrNan=function(a){return _.isNaN(a)||1/0===a||a===-1/0},builtinConverters=[{matchJSONValue:function(a){return _.has(a,"$date")&&1===_.size(a)},matchObject:function(a){return a instanceof Date},toJSONValue:function(a){return{$date:a.getTime()}},fromJSONValue:function(a){return new Date(a.$date)}},{matchJSONValue:function(a){return _.has(a,"$InfNaN")&&1===_.size(a)},matchObject:isInfOrNan,toJSONValue:function(a){var b;return b=_.isNaN(a)?0:1/0===a?1:-1,{$InfNaN:b}},fromJSONValue:function(a){return a.$InfNaN/0}},{matchJSONValue:function(a){return _.has(a,"$binary")&&1===_.size(a)},matchObject:function(a){return"undefined"!=typeof Uint8Array&&a instanceof Uint8Array||a&&_.has(a,"$Uint8ArrayPolyfill")},toJSONValue:function(a){return{$binary:Base64.encode(a)}},fromJSONValue:function(a){return Base64.decode(a.$binary)}},{matchJSONValue:function(a){return _.has(a,"$escape")&&1===_.size(a)},matchObject:function(a){return _.isEmpty(a)||_.size(a)>2?!1:_.any(builtinConverters,function(b){return b.matchJSONValue(a)})},toJSONValue:function(a){var b={};return _.each(a,function(a,c){b[c]=EJSON.toJSONValue(a)}),{$escape:b}},fromJSONValue:function(a){var b={};return _.each(a.$escape,function(a,c){b[c]=EJSON.fromJSONValue(a)}),b}},{matchJSONValue:function(a){return _.has(a,"$type")&&_.has(a,"$value")&&2===_.size(a)},matchObject:function(a){return EJSON._isCustomType(a)},toJSONValue:function(a){var b=Meteor._noYieldsAllowed(function(){return a.toJSONValue()});return{$type:a.typeName(),$value:b}},fromJSONValue:function(a){var b=a.$type;if(!_.has(customTypes,b))throw new Error("Custom EJSON type "+b+" is not defined");var c=customTypes[b];return Meteor._noYieldsAllowed(function(){return c(a.$value)})}}];EJSON._isCustomType=function(a){return a&&"function"==typeof a.toJSONValue&&"function"==typeof a.typeName&&_.has(customTypes,a.typeName())};var adjustTypesToJSONValue=EJSON._adjustTypesToJSONValue=function(a){if(null===a)return null;var b=toJSONValueHelper(a);return void 0!==b?b:"object"!=typeof a?a:(_.each(a,function(b,c){if("object"==typeof b||void 0===b||isInfOrNan(b)){var d=toJSONValueHelper(b);return d?(a[c]=d,void 0):(adjustTypesToJSONValue(b),void 0)}}),a)},toJSONValueHelper=function(a){for(var b=0;b<builtinConverters.length;b++){var c=builtinConverters[b];if(c.matchObject(a))return c.toJSONValue(a)}return void 0};EJSON.toJSONValue=function(a){var b=toJSONValueHelper(a);return void 0!==b?b:("object"==typeof a&&(a=EJSON.clone(a),adjustTypesToJSONValue(a)),a)};var adjustTypesFromJSONValue=EJSON._adjustTypesFromJSONValue=function(a){if(null===a)return null;var b=fromJSONValueHelper(a);return b!==a?b:"object"!=typeof a?a:(_.each(a,function(b,c){if("object"==typeof b){var d=fromJSONValueHelper(b);if(b!==d)return a[c]=d,void 0;adjustTypesFromJSONValue(b)}}),a)},fromJSONValueHelper=function(a){if("object"==typeof a&&null!==a&&_.size(a)<=2&&_.all(a,function(a,b){return"string"==typeof b&&"$"===b.substr(0,1)}))for(var b=0;b<builtinConverters.length;b++){var c=builtinConverters[b];if(c.matchJSONValue(a))return c.fromJSONValue(a)}return a};EJSON.fromJSONValue=function(a){var b=fromJSONValueHelper(a);return b===a&&"object"==typeof a?(a=EJSON.clone(a),adjustTypesFromJSONValue(a),a):b},EJSON.stringify=function(a,b){var c=EJSON.toJSONValue(a);return b&&(b.canonical||b.indent)?EJSON._canonicalStringify(c,b):JSON.stringify(c)},EJSON.parse=function(a){if("string"!=typeof a)throw new Error("EJSON.parse argument should be a string");return EJSON.fromJSONValue(JSON.parse(a))},EJSON.isBinary=function(a){return!!("undefined"!=typeof Uint8Array&&a instanceof Uint8Array||a&&a.$Uint8ArrayPolyfill)},EJSON.equals=function(a,b,c){var d,e=!(!c||!c.keyOrderSensitive);if(a===b)return!0;if(_.isNaN(a)&&_.isNaN(b))return!0;if(!a||!b)return!1;if("object"!=typeof a||"object"!=typeof b)return!1;if(a instanceof Date&&b instanceof Date)return a.valueOf()===b.valueOf();if(EJSON.isBinary(a)&&EJSON.isBinary(b)){if(a.length!==b.length)return!1;for(d=0;d<a.length;d++)if(a[d]!==b[d])return!1;return!0}if("function"==typeof a.equals)return a.equals(b,c);if("function"==typeof b.equals)return b.equals(a,c);if(a instanceof Array){if(!(b instanceof Array))return!1;if(a.length!==b.length)return!1;for(d=0;d<a.length;d++)if(!EJSON.equals(a[d],b[d],c))return!1;return!0}switch(EJSON._isCustomType(a)+EJSON._isCustomType(b)){case 1:return!1;case 2:return EJSON.equals(EJSON.toJSONValue(a),EJSON.toJSONValue(b))}var f;if(e){var g=[];return _.each(b,function(a,b){g.push(b)}),d=0,f=_.all(a,function(a,e){return d>=g.length?!1:e!==g[d]?!1:EJSON.equals(a,b[g[d]],c)?(d++,!0):!1}),f&&d===g.length}return d=0,f=_.all(a,function(a,e){return _.has(b,e)?EJSON.equals(a,b[e],c)?(d++,!0):!1:!1}),f&&_.size(b)===d},EJSON.clone=function(a){var b;if("object"!=typeof a)return a;if(null===a)return null;if(a instanceof Date)return new Date(a.getTime());if(a instanceof RegExp)return a;if(EJSON.isBinary(a)){b=EJSON.newBinary(a.length);for(var c=0;c<a.length;c++)b[c]=a[c];return b}if(_.isArray(a)||_.isArguments(a)){for(b=[],c=0;c<a.length;c++)b[c]=EJSON.clone(a[c]);return b}return"function"==typeof a.clone?a.clone():EJSON._isCustomType(a)?EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(a)),!0):(b={},_.each(a,function(a,c){b[c]=EJSON.clone(a)}),b)},EJSON.newBinary=Base64.newBinary;;

  /*! @source https://github.com/eligrey/Blob.js */
!function(a){"use strict";if(a.URL=a.URL||a.webkitURL,a.Blob&&a.URL)try{return new Blob,void 0}catch(b){}var c=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||function(a){var b=function(a){return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]},c=function(){this.data=[]},d=function(a,b,c){this.data=a,this.size=a.length,this.type=b,this.encoding=c},e=c.prototype,f=d.prototype,g=a.FileReaderSync,h=function(a){this.code=this[this.name=a]},i="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),j=i.length,k=a.URL||a.webkitURL||a,l=k.createObjectURL,m=k.revokeObjectURL,n=k,o=a.btoa,p=a.atob,q=a.ArrayBuffer,r=a.Uint8Array,s=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(d.fake=f.fake=!0;j--;)h.prototype[i[j]]=j+1;return k.createObjectURL||(n=a.URL=function(a){var c,b=document.createElementNS("http://www.w3.org/1999/xhtml","a");return b.href=a,"origin"in b||("data:"===b.protocol.toLowerCase()?b.origin=null:(c=a.match(s),b.origin=c&&c[1])),b}),n.createObjectURL=function(a){var c,b=a.type;return null===b&&(b="application/octet-stream"),a instanceof d?(c="data:"+b,"base64"===a.encoding?c+";base64,"+a.data:"URI"===a.encoding?c+","+decodeURIComponent(a.data):o?c+";base64,"+o(a.data):c+","+encodeURIComponent(a.data)):l?l.call(k,a):void 0},n.revokeObjectURL=function(a){"data:"!==a.substring(0,5)&&m&&m.call(k,a)},e.append=function(a){var c=this.data;if(r&&(a instanceof q||a instanceof r)){for(var e="",f=new r(a),i=0,j=f.length;j>i;i++)e+=String.fromCharCode(f[i]);c.push(e)}else if("Blob"===b(a)||"File"===b(a)){if(!g)throw new h("NOT_READABLE_ERR");var k=new g;c.push(k.readAsBinaryString(a))}else a instanceof d?"base64"===a.encoding&&p?c.push(p(a.data)):"URI"===a.encoding?c.push(decodeURIComponent(a.data)):"raw"===a.encoding&&c.push(a.data):("string"!=typeof a&&(a+=""),c.push(unescape(encodeURIComponent(a))))},e.getBlob=function(a){return arguments.length||(a=null),new d(this.data.join(""),a,"raw")},e.toString=function(){return"[object BlobBuilder]"},f.slice=function(a,b,c){var e=arguments.length;return 3>e&&(c=null),new d(this.data.slice(a,e>1?b:this.data.length),c,this.encoding)},f.toString=function(){return"[object Blob]"},f.close=function(){this.size=0,delete this.data},c}(a);a.Blob=function(a,b){var d=b?b.type||"":"",e=new c;if(a)for(var f=0,g=a.length;g>f;f++)e.append(a[f]);return e.getBlob(d)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
saveAs = void 0;
try{
saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});}catch(e){};

}).call(this);

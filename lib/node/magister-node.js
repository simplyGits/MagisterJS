(function() {
  var messageFolder, request, root, wrapCallback, _, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  root = (_ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * An appointment.
   *
   * @class Appointment
   * @private
   * @param _magisterObj {Magister} A Magister object this Appointment is child of.
   * @constructor
   */

  root.Appointment = (function() {
    function Appointment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * @property beginBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.beginBySchoolHour = root._getset("_beginBySchoolHour");

      /**
      		 * @property endBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.endBySchoolHour = root._getset("_endBySchoolHour");

      /**
      		 * @property fullDay
      		 * @final
      		 * @type Boolean
       */
      this.fullDay = root._getset("_fullDay");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property location
      		 * @final
      		 * @type String
       */
      this.location = root._getset("_location");

      /**
      		 * @property status
      		 * @final
      		 * @type Number
       */
      this.status = root._getset("_status");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * type parsed as a string.
      		 * @property typeString
      		 * @final
      		 * @type String
       */
      this.typeString = root._getset("_type", null, function(x) {
        switch (x) {
          case 0:
            return 'none';
          case 1:
            return 'personal';
          case 2:
            return 'general';
          case 3:
            return 'schoolwide';
          case 4:
            return 'internship';
          case 5:
            return 'intake';
          case 6:
            return 'scheduleFree';
          case 7:
            return 'kwt';
          case 8:
            return 'standby';
          case 9:
            return 'block';
          case 10:
            return 'miscellaneous';
          case 11:
            return 'localBlock';
          case 12:
            return 'classBlock';
          case 13:
            return 'lesson';
          case 14:
            return 'studiehuis';
          case 15:
            return 'scheduleFreeStudy';
          case 16:
            return 'planning';
          case 101:
            return 'actions';
          case 102:
            return 'presences';
          case 103:
            return 'examSchedule';
          default:
            return 'unknown';
        }
      });

      /**
      		 * @property displayType
      		 * @final
      		 * @type Number
       */
      this.displayType = root._getset("_displayType");

      /**
      		 * displayType parsed as a string.
      		 * @property displayTypeString
      		 * @final
      		 * @type String
       */
      this.displayTypeString = root._getset("_displayType", null, function(x) {
        switch (x) {
          case 1:
            return 'available';
          case 2:
            return 'provisionallyScheduled';
          case 3:
            return 'scheduled';
          case 4:
            return 'absent';
          default:
            return 'unknown';
        }
      });

      /**
      		 * @property content
      		 * @final
      		 * @type String
       */
      this.content = root._getset("_content", null, root._helpers.cleanHtmlContent);

      /**
      		 * @property infoType
      		 * @final
      		 * @type Number
       */
      this.infoType = root._getset("_infoType");

      /**
      		 * infoType parsed as a string.
      		 * @property infoTypeString
      		 * @final
      		 * @type String
       */
      this.infoTypeString = root._getset("_infoType", null, function(x) {
        switch (x) {
          case 0:
            return 'none';
          case 1:
            return 'homework';
          case 2:
            return 'test';
          case 3:
            return 'exam';
          case 4:
            return 'quiz';
          case 5:
            return 'oral';
          case 6:
            return 'information';
          case 7:
            return 'annotation';
          default:
            return 'unknown';
        }
      });

      /**
      		 * @property notes
      		 * @final
      		 * @type String
       */
      this.notes = root._getset("_notes");

      /**
      		 * @property isDone
      		 * @type Boolean
       */
      this.isDone = root._getset("_isDone", (function(_this) {
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
      this.classes = root._getset("_classes");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property classRooms
      		 * @final
      		 * @type String[]
       */
      this.classRooms = root._getset("_classRooms");

      /**
      		 * @property groups
      		 * @final
      		 * @type String[]
       */
      this.groups = root._getset("_groups");

      /**
      		 * @property appointmentId
      		 * @final
      		 * @type Number
       */
      this.appointmentId = root._getset("_appointmentId");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * @property scrapped
      		 * @final
      		 * @type Boolean
       */
      this.scrapped = root._getset("_scrapped");

      /**
      		 * @property changed
      		 * @final
      		 * @type Boolean
       */
      this.changed = root._getset("_changed");

      /**
      		 * @property absenceInfo
      		 * @final
      		 * @type AbsenceInfo
       */
      this.absenceInfo = root._getset("_absenceInfo");
    }


    /**
    	 * Gets the attachments for the current Appointment.
    	 * @method attachments
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {File[]} An array containing the attachments.
     */

    Appointment.prototype.attachments = function(cb) {
      if (!this._hasAttachments) {
        cb(null, []);
        return;
      }
      this._magisterObj.http.get(this._url, {}, (function(_this) {
        return function(error, result) {
          var parsed, person;
          if (error != null) {
            return cb(error, null);
          } else {
            parsed = JSON.parse(result.content).Bijlagen;
            person = _this._teachers[0];
            return cb(null, parsed.map(function(f) {
              f._addedBy = person;
              return root.File._convertRaw(_this._magisterObj, void 0, f);
            }));
          }
        };
      })(this));
      return void 0;
    };


    /**
    	 * WARNING. Removes the current Appointment if created by the user.
    	 * @method remove
    	 * @param [callback] {Function} An optional callback.
    	 * 	@param [callback.error] {Object} An error, if it exists.
     */

    Appointment.prototype.remove = function(cb) {
      var _ref1;
      if ((_ref1 = this._type) !== 1 && _ref1 !== 16) {
        return;
      }
      return this._magisterObj.http["delete"](this._url, {}, function(e, r) {
        return cb(e);
      });
    };

    Appointment.prototype._toMagisterStyle = function() {
      var c, obj, p;
      obj = {};
      obj.Id = this._id;
      obj.Start = root._helpers.toUtcString(this._begin);
      obj.Einde = root._helpers.toUtcString(this._end);
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
        var _i, _len, _ref1, _results;
        _ref1 = this._classRooms;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Docenten = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._teachers;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          p = _ref1[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.Vakken = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._classes;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Groepen = this._groups;
      obj.OpdrachtId = this._appointmentId;
      obj.Bijlagen = [];
      return obj;
    };

    Appointment._convertRaw = function(magisterObj, raw) {
      var c, obj, p, _ref1, _ref2, _ref3, _ref4;
      obj = new root.Appointment(magisterObj);
      obj._id = raw.Id;
      obj._begin = root._helpers.parseDate(raw.Start);
      obj._end = root._helpers.parseDate(raw.Einde);
      obj._beginBySchoolHour = raw.LesuurVan;
      obj._endBySchoolHour = raw.LesuurTotMet;
      obj._fullDay = raw.DuurtHeleDag;
      obj._description = (_ref1 = raw.Omschrijving) != null ? _ref1 : "";
      obj._location = (_ref2 = raw.Lokatie) != null ? _ref2 : "";
      obj._status = raw.Status;
      obj._type = raw.Type;
      obj._displayType = raw.WeergaveType;
      obj._content = raw.Inhoud;
      obj._infoType = raw.InfoType;
      obj._notes = raw.Aantekening;
      obj._isDone = raw.Afgerond;
      obj._classes = raw.Vakken != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Vakken;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          p = _ref3[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : [];
      obj._classRooms = raw.Lokalen != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Lokalen;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._groups = raw.Groepen;
      obj._appointmentId = raw.OpdrachtId;
      obj._hasAttachments = raw.HeeftBijlagen;
      obj._url = "" + magisterObj._personUrl + "/afspraken/" + obj._id;
      obj._scrapped = (_ref3 = raw.Status) === 4 || _ref3 === 5;
      obj._changed = (_ref4 = raw.Status) === 3 || _ref4 === 9 || _ref4 === 10;
      return obj;
    };

    Appointment._convertStored = function(magisterObj, raw) {
      var obj;
      obj = _.extend(raw, new root.Appointment(magisterObj));
      obj._magisterObj = magisterObj;
      obj._begin = root._helpers.parseDate(raw._begin);
      obj._end = root._helpers.parseDate(raw._end);
      return obj;
    };

    return Appointment;

  })();


  /**
   * Info about absence for an appointment.
   *
   * @class AbsenceInfo
   * @private
   * @param _magisterObj {Magister} A Magister object this AbsenceInfo is child of.
   * @constructor
   */

  root.AbsenceInfo = (function() {
    function AbsenceInfo(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * @property schoolHour
      		 * @final
      		 * @type Number
       */
      this.schoolHour = root._getset("_schoolHour");

      /**
      		 * @property permitted
      		 * @final
      		 * @type Boolean
       */
      this.permitted = root._getset("_permitted");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * type parsed as a string.
      		 * @property typeString
      		 * @final
      		 * @type String
       */
      this.typeString = root._getset("_type", null, function(x) {
        switch (x) {
          case 1:
            return 'absent';
          case 2:
            return 'late';
          case 3:
            return 'sick';
          case 4:
            return 'discharged';
          case 6:
            return 'exemption';
          case 7:
            return 'books';
          case 8:
            return 'homework';
          default:
            return 'unknown';
        }
      });

      /**
      		 * @property code
      		 * @final
      		 * @type String
       */
      this.code = root._getset("_code");

      /**
      		 * @property appointment
      		 * @final
      		 * @type Appointment
       */
      this.appointment = root._getset("_appointment");
    }

    AbsenceInfo._convertRaw = function(magisterObj, raw) {
      var obj, _ref1, _ref2, _ref3;
      obj = new root.AbsenceInfo(magisterObj);
      obj._id = raw.Id;
      obj._begin = root._helpers.parseDate(raw.Start);
      obj._end = root._helpers.parseDate(raw.Eind);
      obj._schoolHour = raw.Lesuur;
      obj._permitted = raw.Geoorloofd;
      obj._description = (_ref1 = (_ref2 = raw.Omschrijving) != null ? _ref2.trim() : void 0) != null ? _ref1 : '';
      obj._type = raw.Verantwoordingtype;
      obj._code = (_ref3 = raw.Code) != null ? _ref3 : '';
      obj._appointment = root.Appointment._convertRaw(magisterObj, raw.Afspraak);
      return obj;
    };

    return AbsenceInfo;

  })();

  root = (_ref1 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref1 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * An Assignment.
   *
   * @class Assignment
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Assignment is child of.
   */

  root.Assignment = (function() {
    function Assignment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date|undefined
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date|undefined
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date|undefined
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property handInAgain
      		 * @final
      		 * @type Boolean
       */
      this.handInAgain = root._getset("_handInAgain");

      /**
      		 * @property finished
      		 * @final
      		 * @type Boolean
       */
      this.finished = root._getset("_finished");

      /**
      		 * @property canHandIn
      		 * @final
      		 * @type Boolean
       */
      this.canHandIn = root._getset("_canHandIn");
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
      var id, pushResult, _i, _len, _ref2, _results;
      pushResult = root._helpers.asyncResultWaiter(this._versionIds.length, function(r) {
        return callback(null, r);
      });
      _ref2 = this._versionIds;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        id = _ref2[_i];
        _results.push(this._magisterObj.http.get("" + this._magisterObj._personUrl + "/opdrachten/versie/" + id, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return callback(error, null);
            } else {
              return pushResult(root.AssignmentVersion._convertRaw(_this._magisterObj, _this, JSON.parse(result.content)));
            }
          };
        })(this)));
      }
      return _results;
    };

    Assignment._convertRaw = function(magisterObj, raw) {
      var f, obj, p, v;
      obj = new root.Assignment(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._class = raw.Vak;
      obj._deadline = root._helpers.parseDate(raw.InleverenVoor);
      obj._handedInOn = root._helpers.parseDate(raw.IngeleverdOp);
      obj._files = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Bijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : void 0;
      obj._versionIds = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.VersieNavigatieItems;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          v = _ref2[_i];
          _results.push(v.Id);
        }
        return _results;
      })();
      obj._grade = raw.Beoordeling;
      obj._markedOn = root._helpers.parseDate(raw.BeoordeeldOp);
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

  root.AssignmentVersion = (function() {
    function AssignmentVersion(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property pupilMessage
      		 * @final
      		 * @type String
       */
      this.pupilMessage = root._getset("_pupilMessage");

      /**
      		 * @property teacherNotice
      		 * @final
      		 * @type String
       */
      this.teacherNotice = root._getset("_teacherNotice");

      /**
      		 * @property handedInFiles
      		 * @final
      		 * @type File[]
       */
      this.handedInFiles = root._getset("_handedInFiles");

      /**
      		 * @property feedbackFiles
      		 * @final
      		 * @type File[]
       */
      this.feedbackFiles = root._getset("_feedbackFiles");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date|undefined
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date|undefined
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date|undefined
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property version
      		 * @final
      		 * @type Number
       */
      this.version = root._getset("_version");

      /**
      		 * @property tooLate
      		 * @final
      		 * @type Boolean
       */
      this.tooLate = root._getset("_tooLate");
    }

    AssignmentVersion._convertRaw = function(magisterObj, sender, raw) {
      var f, obj;
      obj = new root.AssignmentVersion(magisterObj);
      obj._id = raw.Id;
      obj._class = sender._class;
      obj._state = raw.Status;
      obj._pupilMessage = raw.LeerlingOpmerking;
      obj._teacherNotice = raw.DocentOpmerking;
      obj._handedInFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.LeerlingBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._feedbackFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.FeedbackBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._deadline = root._helpers.parseDate(raw.InleverenVoor);
      obj._handedInOn = root._helpers.parseDate(raw.IngeleverdOp);
      obj._grade = raw.Beoordeling;
      obj._markedOn = root._helpers.parseDate(raw.BeoordeeldOp);
      obj._version = raw.VersieNummer;
      obj._tooLate = raw.IsTeLaat;
      return obj;
    };

    return AssignmentVersion;

  })();

  root = (_ref2 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref2 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A Class (ex. English class)
   *
   * @class Class
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Class is child of.
   */

  root.Class = (function() {
    function Class(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property beginDate
      		 * @final
      		 * @type Date|undefined
       */
      this.beginDate = root._getset("_beginDate");

      /**
      		 * @property endDate
      		 * @final
      		 * @type Date|undefined
       */
      this.endDate = root._getset("_endDate");

      /**
      		 * @property abbreviation
      		 * @final
      		 * @type String
       */
      this.abbreviation = root._getset("_abbreviation");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");
    }

    Class._convertRaw = function(magisterObj, raw) {
      var obj, _ref3, _ref4, _ref5, _ref6;
      obj = new root.Class(magisterObj);
      obj._id = (_ref3 = raw.id) != null ? _ref3 : raw.Id;
      obj._beginDate = root._helpers.parseDate(raw.begindatum);
      obj._endDate = root._helpers.parseDate(raw.einddatum);
      obj._abbreviation = (_ref4 = raw.afkorting) != null ? _ref4 : raw.Afkorting;
      obj._description = (_ref5 = raw.omschrijving) != null ? _ref5 : raw.Omschrijving;
      obj._number = (_ref6 = raw.volgnr) != null ? _ref6 : raw.Volgnr;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.docent
      });
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
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

  root.Course = (function() {
    function Course(_magisterObj) {
      this._magisterObj = _magisterObj;
      this.getOtherTutors = __bind(this.getOtherTutors, this);

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * The 'school period' of this Course (e.g: "1415").
      		 * @property schoolPeriod
      		 * @final
      		 * @type String
       */
      this.schoolPeriod = root._getset("_schoolPeriod");

      /**
      		 * Type of this Course (e.g: { description: "VWO 4", id: 420 }).
      		 * @property type
      		 * @final
      		 * @type Object
       */
      this.type = root._getset("_type");

      /**
      		 * The group of this Course contains the class the user belongs to (e.g: { description: "Klas 4v3", id: 420, locationId: 0 }).
      		 * @property group
      		 * @final
      		 * @type Object
       */
      this.group = root._getset("_group");

      /**
      		 * The 'profile' of this Course (e.g: "A-EM").
      		 * @property profile
      		 * @final
      		 * @type String
       */
      this.profile = root._getset("_profile");

      /**
      		 * An alternative profile, if it exists (e.g: "A-EM").
      		 * @property alternativeProfile
      		 * @final
      		 * @type String
       */
      this.alternativeProfile = root._getset("_alternativeProfile");

      /**
      		 * True if this Course is the current Course.
      		 * @property current
      		 * @final
      		 * @type Boolean
       */
      this.current = root._getset("_current");
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
              var _i, _len, _ref3, _results;
              _ref3 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                c = _ref3[_i];
                _results.push(root.Class._convertRaw(this._magisterObj, c));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the grade periods of this Course.
    	 *
    	 * @method gradePeriods
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {GradePeriod[]} An array containing the GradePeriods.
     */

    Course.prototype.gradePeriods = function(callback) {
      return this._magisterObj.http.get(this._periodsUrl, {}, (function(_this) {
        return function(error, result) {
          var p;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref3, _results;
              _ref3 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                p = _ref3[_i];
                _results.push(root.GradePeriod._convertRaw(this._magisterObj, p));
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
    	 * @param {Object} [options={}]
    	 * 	@param {Boolean} [options.fillPersons=false] Whether or not to download the full user objects from the server.
    	 * 	@param {Boolean} [options.fillGrade=true] Whether or not to download the full grade info should be downloaded from the server. If this is set to false some properties will be not be set or have incorrect values.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade[]} An array containing the Grades.
     */

    Course.prototype.grades = function() {
      var callback, fillGrade, fillPersons, onlyRecent, options, _ref3;
      options = (_ref3 = _.find(arguments, function(a) {
        return _.isPlainObject(a);
      })) != null ? _ref3 : {};
      fillPersons = options.fillPersons, fillGrade = options.fillGrade;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      if (fillPersons == null) {
        fillPersons = false;
      }
      if (fillGrade == null) {
        fillGrade = true;
      }
      onlyRecent = false;
      return this._magisterObj.http.get((onlyRecent ? this._gradesUrlPrefix : this._gradesUrl), {}, (function(_this) {
        return function(error, result) {
          var pushResult, raw, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Items;
            result = _.filter(result, function(raw) {
              return raw.CijferId !== 0;
            });
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              _.chain(r).uniq(function(g) {
                return g["class"]().id;
              }).pluck("_class").forEach(function(c) {
                var g, _i, _len, _ref4, _results;
                _ref4 = _.filter(r, function(g) {
                  return g["class"]().id === c.id;
                });
                _results = [];
                for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                  g = _ref4[_i];
                  _results.push(g._class = c);
                }
                return _results;
              });
              return callback(null, _.sortBy(r, function(g) {
                return g.dateFilledIn();
              }));
            });
            _results = [];
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              raw = result[_i];
              _results.push((function(raw) {
                var g, push, _ref4;
                g = root.Grade._convertRaw(_this._magisterObj, raw);
                g._columnUrl = _this._columnUrlPrefix + ((_ref4 = raw.CijferKolom) != null ? _ref4.Id : void 0);
                push = root._helpers.asyncResultWaiter(2, function() {
                  return pushResult(g);
                });
                if (fillPersons && !onlyRecent) {
                  _this._magisterObj.getPersons(g.Docent, 3, function(e, r) {
                    if (!((e != null) || (r[0] == null))) {
                      g._teacher = r[0];
                    }
                    return push();
                  });
                } else {
                  push();
                }
                if (fillGrade && !onlyRecent) {
                  return g.fillGrade(function(e, r) {
                    if (e != null) {
                      return callback(e, null);
                    } else {
                      return push();
                    }
                  });
                } else {
                  return push();
                }
              })(raw));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the perosnal tutor of the current user for this Course.
    	 *
    	 * @method getPersonalTutor
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getPersonalTutor = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentor", {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, root.Person._convertRaw(_this._magisterObj, JSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * Gets the (group / class) tutors.
    	 *
    	 * @method getOtherTutors
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getOtherTutors = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentoren", {}, (function(_this) {
        return function(error, result) {
          var items, p;
          if (error != null) {
            return callback(error, null);
          } else {
            items = JSON.parse(result.content).items;
            return callback(null, (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = items.length; _i < _len; _i++) {
                p = items[_i];
                _results.push(root.Person._convertRaw(this._magisterObj, p));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    Course._convertRaw = function(magisterObj, raw) {
      var group, obj, _ref3, _ref4;
      obj = new root.Course(magisterObj);
      obj._classesUrl = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/vakken");
      obj._gradesUrlPrefix = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/cijfers");
      obj._gradesUrl = obj._gradesUrlPrefix + "/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false";
      obj._periodsUrl = obj._gradesUrlPrefix + "/cijferperiodenvooraanmelding";
      obj._columnUrlPrefix = obj._gradesUrlPrefix + "/extracijferkolominfo/";
      obj._id = raw.Id;
      obj._begin = root._helpers.parseDate(raw.Start);
      obj._end = root._helpers.parseDate(raw.Einde);
      obj._schoolPeriod = raw.Lesperiode;
      obj._type = {
        id: raw.Studie.Id,
        description: raw.Studie.Omschrijving
      };
      obj._group = {
        id: raw.Groep.Id,
        description: (group = raw.Groep.Omschrijving, group != null ? (_ref3 = _.find(group.split(' '), function(str) {
          return /\d/.test(str);
        })) != null ? _ref3 : group : void 0),
        locationId: raw.Groep.LocatieId
      };
      obj._profile = raw.Profiel;
      obj._alternativeProfile = raw.Profiel2;
      obj._current = (obj._begin.getTime() <= (_ref4 = _.now()) && _ref4 <= obj._end.getTime());
      return obj;
    };

    return Course;

  })();

  root = (_ref3 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref3 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A Digital school utility, usually things like a gateway to an online platform of a book used by a school.
   *
   * @class DigitalSchoolUtility
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this DigitalSchoolUtility is child of.
   */

  root.DigitalSchoolUtility = (function() {
    function DigitalSchoolUtility(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property publisher
      		 * @final
      		 * @type String
       */
      this.publisher = root._getset("_publisher");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * @property EAN
      		 * @final
      		 * @type Number
       */
      this.EAN = root._getset("_EAN");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * This should be a Class object, if no class was found this will be undefined.
      		 * @property class
      		 * @final
      		 * @type Class|undefined
       */
      this["class"] = root._getset("_class");
    }

    DigitalSchoolUtility._convertRaw = function(magisterObj, raw) {
      var obj, _ref4;
      obj = new root.DigitalSchoolUtility(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.MateriaalType;
      obj._name = raw.Titel;
      obj._publisher = raw.Uitgeverij;
      obj._state = raw.Status;
      obj._begin = root._helpers.parseDate(raw.Start);
      obj._end = root._helpers.parseDate(raw.Eind);
      obj._EAN = Number(raw.EAN);
      obj._url = (_ref4 = _.find(raw.Links, function(l) {
        return l.Rel === 'content';
      })) != null ? _ref4.Href : void 0;
      obj._class = root.Class._convertRaw(magisterObj, raw.Vak);
      return obj;
    };

    return DigitalSchoolUtility;

  })();

  root = (_ref4 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref4 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A folder containing File instances.
   *
   * @class FileFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this FileFolder is child of.
   * @constructor
   */

  root.FileFolder = (function() {
    function FileFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * The rights the current user has on this FileFolder.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * The ID of the parent FileFolder of this FileFolder.
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
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
              var _i, _len, _ref5, _results;
              _ref5 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                f = _ref5[_i];
                _results.push(root.File._convertRaw(this._magisterObj, this, f));
              }
              return _results;
            }).call(_this);
            pushResult = root._helpers.asyncResultWaiter(files.length, function(r) {
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
      obj = new root.FileFolder(magisterObj);
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

  root.File = (function() {
    function File(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type String
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @type String
       */
      this.name = root._getset("_name", (function(_this) {
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
      this.uri = root._getset("_uri");

      /**
      		 * The size of this file in bytes.
      		 * @property size
      		 * @final
      		 * @type Number
       */
      this.size = root._getset("_size");

      /**
      		 * The rights the current user has on this File.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * @property mime
      		 * @final
      		 * @type String
       */
      this.mime = root._getset("_mime");

      /**
      		 * @property changedDate
      		 * @final
      		 * @type Date|undefined
       */
      this.changedDate = root._getset("_changedDate");

      /**
      		 * @property creationDate
      		 * @final
      		 * @type Date|undefined
       */
      this.creationDate = root._getset("_creationDate");

      /**
      		 * @property addedBy
      		 * @final
      		 * @type Person
       */
      this.addedBy = root._getset("_addedBy");

      /**
      		 * @property fileBlobId
      		 * @final
      		 * @type String|undefined
       */
      this.fileBlobId = root._getset("_fileBlobId");

      /**
      		 * The FileFolder this File is in.
      		 * @property fileFolder
      		 * @type FileFolder
       */
      this.fileFolder = root._getset("_fileFolder", this.move);

      /**
      		 * @property uniqueId
      		 * @final
      		 * @type String
       */
      this.uniqueId = root._getset("_uniqueId");

      /**
      		 * @property referenceId
      		 * @final
      		 * @type String|undefined
       */
      this.referenceId = root._getset("_referenceId");
    }


    /**
    	 * Downloads the current file
    	 * Currently only accessible from the server.
    	 *
    	 * @method download
    	 * @async
    	 * @param [fileName=true] {Boolean|String} Whether or not to download the file directly. If `downloadFile` is a truely string the file will be downloaded in with the name set to the string's content.
    	 * @param [callback] {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {String} A string containing the base64 encoded binary data of the downloaded file.
     */

    File.prototype.download = function() {
      var callback, fileName, fs, req, request, _ref5;
      fileName = (_ref5 = _.find(arguments, function(a) {
        return _.isString(a) || _.isBoolean(a);
      })) != null ? _ref5 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (typeof Meteor !== "undefined" && Meteor !== null ? Meteor.isServer : void 0) {
        request = Npm.require('request');
        fs = Npm.require('fs');
      } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        request = require('request');
        fs = require('fs');
      } else {
        if (typeof callback === "function") {
          callback(new Error('`File.download` is only accessible from the server at the moment.\nYou can set a proxy yourself with something like iron:router serverside routes.'), null);
        }
        return void 0;
      }
      fileName = (_.isBoolean(fileName) && fileName ? this.name() : _.isString(fileName) ? /(\.{1,2}\/?)*$/.test(fileName) ? fileName += "/" + (this.name()) : fileName : void 0);
      req = request({
        url: this._downloadUrl,
        method: 'GET',
        headers: this._magisterObj.http._cookieInserter(),
        encoding: null
      }).on('error', function(err) {
        return typeof callback === "function" ? callback(err, null) : void 0;
      }).on('response', function(res) {
        return typeof callback === "function" ? callback(null, '') : void 0;
      });
      if (fileName != null) {
        req.pipe(require('fs').createWriteStream(fileName));
      }
      return void 0;
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
              return root._helpers.contains(f.name(), fileFolder, true) || f.id() === fileFolder;
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
      obj.Id = parseInt(this._id, 10);
      obj.BronSoort = this._type;
      obj.Naam = this._name;
      obj.Uri = this._uri;
      obj.Grootte = this._size;
      obj.Privilege = this._rights;
      obj.ContentType = this._mime;
      obj.FileBlobId = this._fileBlobId != null ? parseInt(this._fileBlobId, 10) : void 0;
      obj.ParentId = this._fileFolder.id();
      obj.UniqueId = this._uniqueId;
      obj.Referentie = this._referenceId != null ? parseInt(this._referenceId, 10) : void 0;
      return obj;
    };

    File._convertRaw = function(magisterObj, fileFolder, raw) {
      var addedBy, l, obj, _ref5, _ref6, _ref7;
      if (raw._addedBy != null) {
        addedBy = raw._addedBy;
      } else {
        addedBy = new root.Person(magisterObj, null, "", "");
        addedBy._fullName = raw.GeplaatstDoor;
      }
      obj = new root.File(magisterObj);
      obj._id = raw.Id.toString();
      obj._type = raw.BronSoort;
      obj._name = raw.Naam;
      obj._uri = raw.Uri;
      obj._size = raw.Grootte;
      obj._rights = raw.Privilege;
      obj._mime = raw.ContentType;
      obj._changedDate = root._helpers.parseDate(raw.GewijzigdOp);
      obj._creationDate = root._helpers.parseDate((_ref5 = raw.GemaaktOp) != null ? _ref5 : raw.Datum);
      obj._addedBy = addedBy;
      obj._fileBlobId = (_ref6 = raw.FileBlobId) != null ? _ref6.toString() : void 0;
      obj._fileFolder = fileFolder;
      obj._uniqueId = raw.UniqueId;
      obj._referenceId = (_ref7 = raw.Referentie) != null ? _ref7.toString() : void 0;
      l = _.find(raw.Links, {
        Rel: 'Contents'
      });
      if (l == null) {
        l = _.find(raw.Links, {
          Rel: 'Self'
        });
      }
      if (/^https?/.test(l.Href)) {
        obj._downloadUrl = l.Href;
      } else {
        obj._downloadUrl = magisterObj.magisterSchool.url + l.Href;
      }
      return obj;
    };

    return File;

  })();

  root = (_ref5 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref5 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A Grade (ex. 1,0)
   *
   * @class Grade
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Grade is child of.
   */

  root.Grade = (function() {
    function Grade(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property passed
      		 * @final
      		 * @type Boolean
       */
      this.passed = root._getset("_passed");

      /**
      		 * @property dateFilledIn
      		 * @final
      		 * @type Date|undefined
       */
      this.dateFilledIn = root._getset("_dateFilledIn");

      /**
      		 * @property testDate
      		 * @final
      		 * @type Date|undefined
       */
      this.testDate = root._getset("_testDate");

      /**
      		 * @property period
      		 * @final
      		 * @type GradePeriod
       */
      this.period = root._getset("_period");

      /**
      		 * @property class
      		 * @final
      		 * @type Object
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property atLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.atLaterDate = root._getset("_atLaterDate");

      /**
      		 * @property exemption
      		 * @final
      		 * @type Boolean
       */
      this.exemption = root._getset("_exemption");

      /**
      		 * @property counts
      		 * @final
      		 * @type Boolean
       */
      this.counts = root._getset("_counts");

      /**
      		 * @property type
      		 * @final
      		 * @type GradeType
       */
      this.type = root._getset("_type");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property weight
      		 * @final
      		 * @type Number
       */
      this.weight = root._getset("_weight");
    }


    /**
    	 * Downloads extra info, if it's not downloaded yet and fills the current grade
    	 * with it.
    	 *
    	 * @method fillGrade
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade} The current grade filled with the newely downloaded info.
     */

    Grade.prototype.fillGrade = function(callback) {
      if (!this._filled) {
        return this._magisterObj.http.get(this._columnUrl, {}, (function(_this) {
          return function(error, result) {
            var _ref6, _ref7;
            if (error != null) {
              return typeof callback === "function" ? callback(error, null) : void 0;
            } else {
              result = JSON.parse(result.content);
              _this._testDate = root._helpers.parseDate(result.WerkinformatieDatumIngevoerd);
              _this._description = (_ref6 = result.WerkInformatieOmschrijving) != null ? _ref6 : "";
              _this._weight = Number(result.Weging);
              if (_.isNaN(_this._weight)) {
                _this._weight = 0;
              }
              _this._type._level = result.KolomNiveau;
              _this._type._description = (_ref7 = result.KolomOmschrijving) != null ? _ref7 : "";
              _this._filled = true;
              return typeof callback === "function" ? callback(null, _this) : void 0;
            }
          };
        })(this));
      } else {
        return typeof callback === "function" ? callback(null, this) : void 0;
      }
    };

    Grade._convertRaw = function(magisterObj, raw) {
      var obj, period, val, _ref6, _ref7, _ref8;
      obj = new root.Grade(magisterObj);
      obj._id = raw.CijferId;
      obj._grade = raw.CijferStr;
      obj._passed = raw.IsVoldoende;
      obj._dateFilledIn = root._helpers.parseDate(raw.DatumIngevoerd);
      obj._period = (period = new root.GradePeriod(magisterObj), period._id = raw.CijferPeriode.Id, period._name = (_ref6 = raw.CijferPeriode.Naam) != null ? _ref6 : "", period);
      obj._class = {
        id: raw.Vak.Id,
        abbreviation: (_ref7 = raw.Vak.Afkorting) != null ? _ref7 : "",
        description: (_ref8 = raw.Vak.Omschrijving) != null ? _ref8 : ""
      };
      obj._atLaterDate = raw.Inhalen;
      obj._exemption = raw.Vrijstelling;
      obj._counts = raw.TeltMee;
      if ((val = raw.CijferKolom) != null) {
        obj._type = root.GradeType._convertRaw(magisterObj, val);
      }
      obj._assignmentId = raw.CijferKolomIdEloOpdracht;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.Docent
      });
      obj._teacher._type = 3;
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      obj._description = "";
      obj._weight = 0;
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

  root.GradeType = (function() {
    function GradeType(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property header
      		 * @final
      		 * @type String
       */
      this.header = root._getset("_header");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * type parsed as a string.
      		 * @property typeString
      		 * @final
      		 * @type String
       */
      this.typeString = root._getset("_type", null, function(x) {
        switch (x) {
          case 1:
            return "grade";
          case 2:
            return "average";
          case 3:
            return "maximum";
          case 4:
            return "formula";
          case 5:
            return "minimum";
          case 6:
            return "sum";
          case 7:
            return "count";
          case 8:
            return "cevo";
          case 9:
            return "text";
          case 10:
            return "cevocpe";
          case 11:
            return "cevocie";
          case 12:
            return "weight";
          case 13:
            return "end";
          case 14:
            return "deficit";
          default:
            return "unknown";
        }
      });

      /**
      		 * @property isAtLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.isAtLaterDate = root._getset("_isAtLaterDate");

      /**
      		 * @property isTeacher
      		 * @final
      		 * @type Boolean
       */
      this.isTeacher = root._getset("_isTeacher");

      /**
      		 * @property hasNestedTypes
      		 * @final
      		 * @type Boolean
       */
      this.hasNestedTypes = root._getset("_hasNestedTypes");

      /**
      		 * @property isPTA
      		 * @final
      		 * @type Boolean
       */
      this.isPTA = root._getset("_isPTA");

      /**
      		 * Have no idea what this is. If anybody has an idea, tell me please so we can make this doc at least a bit useful.
      		 * @property level
      		 * @final
       */
      this.level = root._getset("_level");

      /**
      		 * @property isEnd
      		 * @final
      		 * @type Boolean
       */
      this.isEnd = function() {
        var _ref6;
        return (_ref6 = this.type()) === 2 || _ref6 === 13;
      };
    }

    GradeType._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.GradeType(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.KolomNaam;
      obj._number = raw.KolomNummer;
      obj._header = raw.KolomKop;
      obj._type = raw.KolomSoort;
      obj._isAtLaterDate = raw.IsHerkansingKolom;
      obj._isTeacher = raw.IsDocentKolom;
      obj._hasNestedTypes = raw.HeeftOndeliggendeKolommen;
      obj._isPTA = raw.IsPTAKolom;
      obj._level = null;
      obj._description = "";
      return obj;
    };

    return GradeType;

  })();


  /**
   * A Grade period.
   * @class GradePeriod
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this GradePeriod is child of.
   */

  root.GradePeriod = (function() {
    function GradePeriod(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");
    }

    GradePeriod._convertRaw = function(magisterObj, raw) {
      var obj, _ref6, _ref7;
      obj = new root.GradePeriod(magisterObj);
      obj._id = raw.Id;
      obj._begin = root._helpers.parseDate(raw.Start);
      obj._end = root._helpers.parseDate(raw.Einde);
      obj._name = (_ref6 = raw.Naam) != null ? _ref6 : "";
      obj._description = (_ref7 = raw.Omschrijving) != null ? _ref7 : "";
      return obj;
    };

    return GradePeriod;

  })();

  root = (_ref6 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref6 : this.Magister != null ? this.Magister : this.Magister = {};

  if (typeof Meteor !== "undefined" && Meteor !== null) {
    this._ = _ = lodash;
  } else if (((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) && (typeof require !== "undefined" && require !== null) && (typeof window === "undefined" || window === null)) {
    if (_ == null) {
      this._ = _ = require("lodash");
    }
  } else if (this._ != null) {
    _ = this._;
  } else {
    throw new Error("Lo-dash or underscore is required.");
  }


  /**
   * The version of this Magister.js.
   * @property VERSION
   * @final
   * @type String
   */

  root.VERSION = "1.22.0";


  /**
   * A JavaScript implementation of the Magister 6 API.
   * @author Lieuwe Rooijakkers
   * @module Magister
   */


  /**
   * Class to communicate with Magister.
   *
   * @class Magister
   * @param options {Object} An object containing your perfered options.
   *	 @param options.school {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
   *	 @param [options.username] {String} The username of the user to login to. (Not needed when using an sessionId.)
   *	 @param [options.password] {String} The password of the user to login to. (Not needed when using an sessionId.)
   *	 @param [options.sessionId] {String} An sessionId to use instead of logging in to retreive a new one.
   *	 @param [options.keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
   *	 @param [options.login=true] {Boolean} If this is set to false you will have to call `Magister::_reLogin` yourself.
   * @constructor
   */

  root.Magister = (function() {
    function Magister() {
      var keepLoggedIn, options, password, school, username;
      options = {
        keepLoggedIn: true,
        login: true
      };
      if (arguments.length === 1 && _.isObject(arguments[0])) {
        options = _.extend(options, arguments[0]);
      } else {
        if (!(arguments.length === 3 || arguments.length === 4)) {
          throw new Error("Expected 3 or 4 arguments, got " + arguments.length);
        }
        school = arguments[0];
        username = arguments[1];
        password = arguments[2];
        keepLoggedIn = arguments[3];
        options = _.extend(options, {
          school: school,
          username: username,
          password: password,
          keepLoggedIn: keepLoggedIn
        });
      }
      if ((options.school == null) || ((options.sessionId == null) && (_.isEmpty(options.username) || _.isEmpty(options.password)))) {
        throw new Error('school, username and password are required.');
      }
      this._readyCallbacks = [];
      this.http = new root.MagisterHttp();
      this.magisterSchool = options.school;
      this.username = options.username;
      this.password = options.password;
      this._keepLoggedIn = options.keepLoggedIn;
      if (_.isString(this.magisterSchool)) {
        root.MagisterSchool.getSchools(this.magisterSchool, (function(_this) {
          return function(e, r) {
            if (e != null) {
              return _this._setErrored(e);
            } else if (r.length === 0) {
              return _this._setErrored(new Error("No school with the query " + _this.magisterSchool + " found."));
            } else {
              _this.magisterSchool = r[0];
              if (options.login) {
                return _this._reLogin(options.sessionId);
              }
            }
          };
        })(this));
      } else {
        this.magisterSchool = _.extend(new root.MagisterSchool, this.magisterSchool);
        if (options.login) {
          this._reLogin(options.sessionId);
        }
      }
    }


    /**
    	 * Get the appoinments of the current User between the two given Dates.
    	 *
    	 * @method appointments
    	 * @async
    	 * @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
    	 * @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
    	 * @param [fillPersons=false] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [ignoreAbsenceErrors=true] {Boolean} When true, the callback will not be called with an error if only fetching the absences failed.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Appointment[]} An array containing the Appointments.
     */

    Magister.prototype.appointments = function() {
      var callback, dateConvert, dates, fillPersons, from, ignoreAbsenceErrors, to, url, _ref7, _ref8;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      _ref7 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref7[0], ignoreAbsenceErrors = _ref7[1];
      if (fillPersons == null) {
        fillPersons = false;
      }
      if (ignoreAbsenceErrors == null) {
        ignoreAbsenceErrors = true;
      }
      dates = _.filter(arguments, _.isDate);
      _ref8 = _.sortBy(dates), from = _ref8[0], to = _ref8[1];
      if (to == null) {
        to = from;
      }
      from = root._helpers.date(from);
      to = root._helpers.date(to);
      this._forceReady();
      dateConvert = root._helpers.urlDateConvert;
      url = "" + this._personUrl + "/afspraken?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from));
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var a, absenceInfo, appointments, finish, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            appointments = (function() {
              var _i, _len, _ref9, _results;
              _ref9 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                a = _ref9[_i];
                _results.push(root.Appointment._convertRaw(this, a));
              }
              return _results;
            }).call(_this);
            absenceInfo = null;
            finish = root._helpers.asyncResultWaiter(2, function(r) {
              _.each(appointments, function(a) {
                return a._absenceInfo = _.find(absenceInfo, function(i) {
                  return i.appointment().id() === a.id();
                });
              });
              appointments = _.chain(appointments).sortBy('_begin').value();
              return callback(null, appointments);
            });
            _this.http.get("" + _this._personUrl + "/absenties?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              if (error != null) {
                if (ignoreAbsenceErrors) {
                  return finish();
                } else {
                  return callback(error, null);
                }
              } else {
                result = JSON.parse(result.content).Items;
                absenceInfo = result.map(function(i) {
                  return root.AbsenceInfo._convertRaw(_this, i);
                });
                return finish();
              }
            });
            if (fillPersons) {
              pushResult = root._helpers.asyncResultWaiter(appointments.length, function() {
                return finish();
              });
              _results = [];
              for (_i = 0, _len = appointments.length; _i < _len; _i++) {
                a = appointments[_i];
                _results.push((function(a) {
                  var teachers;
                  teachers = a.teachers();
                  return _this.fillPersons(teachers, (function(e, r) {
                    a._teachers = r;
                    return pushResult();
                  }), 3);
                })(a));
              }
              return _results;
            } else {
              return finish();
            }
          }
        };
      })(this));
    };


    /**
    	 * Creates a new appointment based on the given `options`.
    	 *
    	 * @method createAppointment
    	 * @param options {Object} An object containing options and stuff.
    	 * 	@param options.name {String} The name of the appointment.
    	 * 	@param options.start {Date} The start of the appointment, time is ignored when `options.fullDay` is set to true.
    	 * 	@param options.end {Date} The end of the appointment, this is ignored when `options.fullDay` is set to true.
    	 * 	@param [options.fullDay=false] {Boolean} When this is true, `options.end` is ignored and only `options.start` is used to set the begin and the end for the appointment.
    	 * 	@param [options.location] {String} The location (classroom for example) for the appointment.
    	 * 	@param [options.content] {String} Some arbitrary string you want to save.
    	 * 	@param [options.type=1] {Number} The type of the appointment: 1 for personal or 16 for planning
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Appointment} The newly created appointment.
     */

    Magister.prototype.createAppointment = function(options, callback) {
      var content, key, payload, required, start, _i, _len, _ref10, _ref7, _ref8, _ref9;
      this._forceReady();
      required = ['name', 'start', 'end'];
      for (_i = 0, _len = required.length; _i < _len; _i++) {
        key = required[_i];
        if (options[key] == null) {
          callback(new Error("Not all required fields for `options` are given, required are: [ " + (required.join(', ')) + " ]"), null);
          return void 0;
        }
      }
      start = (options.fullDay ? root._helpers.date(options.start) : options.start);
      payload = {
        Start: root._helpers.toUtcString(start),
        Einde: root._helpers.toUtcString((options.fullDay ? new Date(start.getTime() + (1000 * 60 * 60 * 24)) : options.end)),
        Omschrijving: options.name,
        Lokatie: (_ref7 = options.location) != null ? _ref7 : '',
        Inhoud: (content = (_ref8 = options.content) != null ? _ref8.trim() : void 0, (content != null) && content.length > 0 ? _.escape(options.content) : null),
        Type: (_ref9 = options.type) != null ? _ref9 : 1,
        DuurtHeleDag: (_ref10 = options.fullDay) != null ? _ref10 : false,
        InfoType: 0,
        WeergaveType: 1,
        Status: 2,
        HeeftBijlagen: false,
        Bijlagen: null,
        LesuurVan: null,
        LesuurTotMet: null,
        Aantekening: null,
        Afgerond: false,
        Vakken: null,
        Docenten: null,
        Links: null,
        Id: 0,
        Lokalen: null,
        Groepen: null,
        OpdrachtId: 0
      };
      return this.http.post("" + this._personUrl + "/afspraken", payload, {}, (function(_this) {
        return function(e, r) {
          var appointment;
          if (e != null) {
            return callback(e, null);
          } else {
            appointment = root.Appointment._convertRaw(_this, payload);
            appointment._url = _this.magisterSchool.url + JSON.parse(r.content).Url;
            return callback(null, appointment);
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @param [query] {String} A case insensetive query the MessageFolder need to match.
    	 * @param [callback] {Function} If a callback is given, the message folders will be refetched.
    	 *	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]|undefined} An array containing the matching messageFolders or undefined if a callback is given.
     */

    Magister.prototype.messageFolders = function(query, callback) {
      var result;
      this._forceReady();
      if (callback != null) {
        this._fetchMessageFolders((function(_this) {
          return function(e, r) {
            if (e != null) {
              return callback(e, null);
            } else {
              return callback(null, _this.messageFolders(query));
            }
          };
        })(this));
        return void 0;
      }
      query = query != null ? query.trim() : void 0;
      result = (_.isString(query) ? _.filter(this._messageFolders, function(mF) {
        return root._helpers.contains(mF.name(), query, true);
      }) : this._messageFolders);
      return result != null ? result : [];
    };


    /**
    	 * Fetches the messageFolders for the current Magister object.
    	 *
    	 * @method _fetchMessageFolders
    	 * @private
    	 * @param callback {Function}
    	 * 	@param [callback.error] {Object} The error, if it exists.
     */

    Magister.prototype._fetchMessageFolders = function(callback) {
      return this.http.get("" + this._personUrl + "/berichten/mappen", {}, (function(_this) {
        return function(e, r) {
          var m;
          if (e != null) {
            e.statusCode = r != null ? r.statusCode : void 0;
            return callback(e);
          } else {
            _this._messageFolders = (function() {
              var _i, _len, _ref7, _results;
              _ref7 = JSON.parse(r.content).Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                m = _ref7[_i];
                _results.push(root.MessageFolder._convertRaw(this, m));
              }
              return _results;
            }).call(_this);
            return callback(null);
          }
        };
      })(this));
    };


    /**
    	 * @method inbox
    	 * @return {MessageFolder} The inbox of the current user.
     */

    Magister.prototype.inbox = function() {
      return this.messageFolders("postvak in")[0];
    };


    /**
    	 * @method sentItems
    	 * @return {MessageFolder} The sent items folder of the current user.
     */

    Magister.prototype.sentItems = function() {
      return this.messageFolders("verzonden items")[0];
    };


    /**
    	 * @method bin
    	 * @return {MessageFolder} The bin of the current user.
     */

    Magister.prototype.bin = function() {
      return this.messageFolders("verwijderde items")[0];
    };


    /**
    	 * @method alerts
    	 * @return {MessageFolder} The alerts folder of the current user.
     */

    Magister.prototype.alerts = function() {
      return this.messageFolders("mededelingen")[0];
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
          var c, converted;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            converted = (function() {
              var _i, _len, _ref7, _results;
              _ref7 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                c = _ref7[_i];
                _results.push(root.Course._convertRaw(this, c));
              }
              return _results;
            }).call(_this);
            return callback(null, _.chain(converted).sortBy("_beginDate").sortBy(function(x) {
              return !x._current;
            }).value());
          }
        };
      })(this));
    };


    /**
    	 * Gets the current grade of the current User.
    	 *
    	 * @method currentCourse
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Course} The current Course.
     */

    Magister.prototype.currentCourse = function(callback) {
      this._forceReady();
      return this.courses(function(e, r) {
        if (e != null) {
          return callback(e, null);
        } else {
          return callback(null, _.find(r, function(c) {
            return c.current();
          }));
        }
      });
    };


    /**
    	 * Gets limited course info for the current Course for the current User.
    	 *
    	 * This is quicker than `courses`, however it's not as consistent and
    	 * doesn't really fit in Magister.js's style, however if you know what
    	 * you're doing and you're willing to use this, go ahead.
    	 *
    	 * @method getLimitedCurrentCourseInfo
    	 * @async
    	 * @deprecated `courses` is prefered.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Object} The limited course info.
    	 * 		@param [callback.result.group] {String}
    	 * 		@param [callback.result.profile] {String}
    	 * 		@param [callback.result.pupilId] {any}
    	 * 		@param [callback.result.type] {Object}
    	 * 			@param [callback.result.type.year] {Number}
    	 * 			@param [callback.result.type.schoolVariant] {String}
     */

    Magister.prototype.getLimitedCurrentCourseInfo = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/opleidinggegevensprofiel";
      return this.http.get(url, {}, function(error, result) {
        var e, group, parsed, _ref7, _ref8, _ref9;
        if (error != null) {
          return callback(error, null);
        } else {
          try {
            parsed = JSON.parse(result.content);
            return callback(null, {
              group: (group = parsed.Klas, group != null ? (_ref7 = _.find(group.split(' '), function(str) {
                return /\d/.test(str);
              })) != null ? _ref7 : group : void 0),
              profile: parsed.Profielen,
              pupilId: parsed.StamNr,
              type: {
                year: +((_ref8 = /\d+/.exec(parsed.Studie)) != null ? _ref8[0] : void 0),
                schoolVariant: (_ref9 = /[^\d\s]+/.exec(parsed.Studie)) != null ? _ref9[0] : void 0
              }
            });
          } catch (_error) {
            e = _error;
            return callback(e, null);
          }
        }
      });
    };

    Magister._cachedPersons = {};


    /**
    	 * Gets an Array of Persons that matches the given profile.
    	 *
    	 * @method getPersons
    	 * @async
    	 * @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
    	 * @param [type] {String} The type the person must have. One of: 'pupil', 'teacher', 'project', 'other'. If none is given it will search for both Teachers and Pupils.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person[]} An array containing the Persons.
    	 * @return {Boolean} True if cached result was used, false otherwise.
     */

    Magister.prototype.getPersons = function() {
      var b1, b2, callback, query, queryType, type, url, val, _ref7;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isString(a);
      }), query = _ref7[0], type = _ref7[1];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      query = (query != null ? query.trim() : '');
      if (query.length < 3) {
        callback(null, []);
        return false;
      }
      if (type == null) {
        b1 = b2 = false;
        b1 = this.getPersons(query, 'teacher', (function(_this) {
          return function(e, r) {
            var teachers;
            if (e != null) {
              return callback(e, null);
            } else {
              teachers = r;
              return b2 = _this.getPersons(query, 'pupil', function(e, r) {
                if (e != null) {
                  return callback(e, null);
                } else {
                  return callback(null, r.concat(teachers));
                }
              });
            }
          };
        })(this));
        return b1 || b2;
      }
      queryType = (function() {
        switch (type) {
          case 'teacher':
            return 'Personeel';
          case 'pupil':
            return 'Leerling';
          case 'project':
            return 'Project';
          default:
            return 'Overig';
        }
      })();
      url = "" + this._personUrl + "/contactpersonen?contactPersoonType=" + queryType + "&q=" + (query.replace(/\ +/g, "+"));
      if ((val = root.Magister._cachedPersons["" + this._id + type + query]) != null) {
        root._helpers.defer(callback, null, val);
        return true;
      } else {
        this.http.get(url, {}, (function(_this) {
          return function(error, result) {
            var p;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  p = _ref8[_i];
                  _results.push(root.Person._convertRaw(this, p));
                }
                return _results;
              }).call(_this);
              root.Magister._cachedPersons["" + _this._id + type + query] = result;
              return callback(null, result);
            }
          };
        })(this));
        return false;
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
      var p, pushResult, _i, _len, _ref7, _ref8;
      this._forceReady();
      if (_.isArray(persons)) {
        if (persons.length === 0) {
          callback(null, []);
          return void 0;
        }
        pushResult = root._helpers.asyncResultWaiter(persons.length, function(r) {
          return callback(null, r);
        });
        for (_i = 0, _len = persons.length; _i < _len; _i++) {
          p = persons[_i];
          try {
            this.getPersons(_.last(p.fullName().split(" ")), (_ref7 = p._type) != null ? _ref7 : overwriteType, function(e, r) {
              var _ref8;
              return pushResult((_ref8 = r[0]) != null ? _ref8 : p);
            });
          } catch (_error) {
            pushResult(p);
          }
        }
      } else if (_.isObject(persons)) {
        try {
          this.getPersons(_.last(persons.fullName().split(" ")), (_ref8 = persons._type) != null ? _ref8 : overwriteType, function(e, r) {
            var _ref9;
            return callback(null, (_ref9 = r[0]) != null ? _ref9 : persons);
          });
        } catch (_error) {
          callback(null, persons);
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
    	 * @param recipients {Person[]|String[]|Number[]|Person|String|Number} The recipient(s) the message will be sent to.
    	 * @param [callback] {Function} An optional callback.
    	 * 	@param [callback.error] {Object} An error, if it exists.
    	 * 	@param [callback.result] {Message} The sent message.
     */

    Magister.prototype.composeAndSendMessage = function() {
      var body, callback, m, recipients, subject, _ref7;
      this._forceReady();
      _ref7 = _.filter(arguments, _.isString), subject = _ref7[0], body = _ref7[1];
      callback = _.find(arguments, _.isFunction);
      recipients = _.last(_.filter(arguments, function(a) {
        return a !== callback;
      }));
      m = new root.Message(this);
      m.subject(subject);
      m.body(body != null ? body : '');
      m.addRecipient(recipients);
      return m.send(callback);
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
              var _i, _len, _ref7, _results;
              _ref7 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                f = _ref7[_i];
                _results.push(root.FileFolder._convertRaw(this, f));
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
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false StudyGuide.class() will return null. (You can use `StudyGuide.classCodes` instead then.)
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
     */

    Magister.prototype.studyGuides = function(callback) {
      var cb, fillClass, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._pupilUrl + "/studiewijzers?peildatum=" + (root._helpers.urlDateConvert(new Date)), {}, function(error, result) {
            var s, studyGuide, _fn, _i, _len;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  s = _ref8[_i];
                  _results.push(root.StudyGuide._convertRaw(this, s));
                }
                return _results;
              }).call(_this);
              _fn = function(studyGuide) {
                if (classes != null) {
                  return studyGuide._class = _.find(classes, function(c) {
                    return c.abbreviation() === studyGuide._class;
                  });
                } else {
                  return studyGuide._class = null;
                }
              };
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                studyGuide = result[_i];
                _fn(studyGuide);
              }
              return callback(null, result);
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
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
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Assignments for the current user.
    	 *
    	 * @method assignments
    	 * @async
    	 * @param [amount=50] {Number} The amount of Assignments to fetch from the server.
    	 * @param [skip=0] {Number} The amount of Assignments to skip.
    	 * @param [fillPersons=false] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false Assignment.class() will return null.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Assignment[]} An array containing Assignments.
     */

    Magister.prototype.assignments = function() {
      var amount, callback, cb, fillClass, fillPersons, skip, _ref7, _ref8;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isNumber(a);
      }), amount = _ref7[0], skip = _ref7[1];
      _ref8 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref8[0], fillClass = _ref8[1];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (fillPersons == null) {
        fillPersons = false;
      }
      if (fillClass == null) {
        fillClass = true;
      }
      if (amount == null) {
        amount = 50;
      }
      if (skip == null) {
        skip = 0;
      }
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._personUrl + "/opdrachten?skip=" + skip + "&top=" + amount + "&status=alle", {}, function(error, result) {
            var e, id, pushResult, _i, _len, _results;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref9, _results;
                _ref9 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                  e = _ref9[_i];
                  _results.push(e.Id);
                }
                return _results;
              })();
              pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
                return callback(null, r);
              });
              _results = [];
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                id = result[_i];
                _results.push(_this.http.get("" + _this._personUrl + "/opdrachten/" + id, {}, function(error, result) {
                  var assignment, teachers, _ref9;
                  assignment = root.Assignment._convertRaw(_this, JSON.parse(result.content));
                  if (classes != null) {
                    assignment._class = _.find(classes, function(c) {
                      return c.abbreviation() === assignment._class;
                    });
                  } else {
                    assignment._class = null;
                  }
                  if (fillPersons) {
                    teachers = (_ref9 = assignment.teachers()) != null ? _ref9 : [];
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
      if (fillClass) {
        return this.courses(function(e, r) {
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
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Digital school utilities for the current user.
    	 *
    	 * @method digitalSchoolUtilities
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
     */

    Magister.prototype.digitalSchoolUtilities = function() {
      var callback, fillClass, url, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      url = "" + this._personUrl + "/lesmateriaal";
      return this.http.get(url, {}, (function(_this) {
        return function(e, r) {
          var convert, parsed;
          if (e != null) {
            return callback(e, null);
          } else {
            convert = _.partial(root.DigitalSchoolUtility._convertRaw, _this);
            parsed = JSON.parse(r.content).Items;
            return callback(null, _.map(parsed, convert));
          }
        };
      })(this));
    };


    /**
    	 * Returns the profile for the current logged in user.
    	 *
    	 * @method profileInfo
    	 * @return {ProfileInfo} The profile of the current logged in user.
     */

    Magister.prototype.profileInfo = function() {
      this._forceReady();
      return this._profileInfo;
    };


    /**
    	 * Returns the children of the current user.
    	 *
    	 * @method children
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Magister[]} An array containg an Magister instance for each child.
     */

    Magister.prototype.children = function(callback) {
      return this.http.get("" + this._personUrl + "/kinderen", {}, (function(_this) {
        return function(error, result) {
          var info, m, parsed, raw, res, _i, _len, _ref7;
          if (error != null) {
            return callback(error, null);
          } else {
            parsed = JSON.parse(result.content);
            if ((parsed.ExceptionId != null) && parsed.Reason === 1) {
              callback(_.extend(parsed, {
                message: "User is not a parent."
              }), null);
              return;
            }
            res = [];
            _ref7 = parsed.Items;
            for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
              raw = _ref7[_i];
              info = root.ProfileInfo._convertRaw(_this, raw);
              info._profilePicture = "" + _this.magisterSchool.url + "/api/personen/" + raw.Id + "/foto";
              res.push((m = new Magister({
                school: _this.magisterSchool,
                username: _this.username,
                password: _this.password,
                login: false
              }), m.http = _this.http, m._id = raw.Id, m._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + m._id, m._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + m._id, m._profileInfo = info, m._ready = true, m));
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
    	 * 		@param [callback.error.statusCode] {Number} If the error is returned over HTTP, the statusCode that was returned.
    	 * 	@param callback.this {Magister} The current Magister object.
    	 * @return {Boolean} Whether or not the current Magister instance is done logging in.
     */

    Magister.prototype.ready = function(callback) {
      if (_.isFunction(callback)) {
        callback = _.bind(callback, this);
        if (this._ready || (this._magisterLoadError != null)) {
          callback(this._magisterLoadError);
        } else {
          this._readyCallbacks.push(callback);
        }
      }
      return this._ready === true;
    };

    Magister.prototype._forceReady = function() {
      if (!this._ready) {
        throw new Error("Not done with logging in or errored during logging in! (did you use Magister.ready(callback) to be sure that logging in is done?)");
      }
    };

    Magister.prototype._setReady = function() {
      var callback, _i, _len, _ref7;
      this._ready = true;
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
        callback();
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._setErrored = function(e, statusCode) {
      var callback, key, parsed, _i, _len, _ref7;
      try {
        parsed = JSON.parse(e);
        this._magisterLoadError = {};
        for (key in parsed) {
          this._magisterLoadError[key.toLowerCase()] = parsed[key];
        }
        this._magisterLoadError.toString = function() {
          var _ref7;
          return (_ref7 = parsed.message) != null ? _ref7 : '';
        };
      } catch (_error) {
        this._magisterLoadError = e;
      }
      if (statusCode != null) {
        this._magisterLoadError.statusCode = statusCode;
      }
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
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
    	 * @method _reLogin
    	 * @param [sessionId] {String} An optional sessionId to use. Shortens login process.
    	 * @private
     */

    Magister.prototype._reLogin = function(sessionId) {
      var cb, deleteUrl, postUrl, setSessionId;
      this._ready = false;
      this._magisterLoadError = null;
      this.magisterSchool.url = this.magisterSchool.url.replace(/^https?/, "https");
      deleteUrl = "" + this.magisterSchool.url + "/api/sessies/huidige";
      postUrl = "" + this.magisterSchool.url + "/api/sessies";
      setSessionId = (function(_this) {
        return function(sessionId) {
          _this._sessionId = sessionId;
          return _this.http._cookie = "SESSION_ID=" + _this._sessionId + "; M6UserName=" + _this.username;
        };
      })(this);
      cb = (function(_this) {
        return function() {
          var e;
          try {
            return _this.http.get("" + _this.magisterSchool.url + "/api/account", {}, function(error, result) {
              var e;
              if (error != null) {
                _this._setErrored(error, result != null ? result.statusCode : void 0);
                return;
              }
              try {
                result = JSON.parse(result.content);
                _this._id = result.Persoon.Id;
                _this._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + _this._id;
                _this._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + _this._id;
                _this._profileInfo = root.ProfileInfo._convertRaw(_this, result.Persoon);
              } catch (_error) {
                e = _error;
                _this._setErrored(e, result != null ? result.statusCode : void 0);
                return;
              }
              return _this._fetchMessageFolders(function(e) {
                if (e != null) {
                  return _this._setErrored(e, e.statusCode);
                } else {
                  return _this._setReady();
                }
              });
            });
          } catch (_error) {
            e = _error;
            return _this._setErrored(e);
          }
        };
      })(this);
      if (sessionId != null) {
        setSessionId(sessionId);
        return cb();
      } else {
        return this.http["delete"](deleteUrl, {}, (function(_this) {
          return function(e, r) {
            if (e != null) {
              _this._setErrored(e, r != null ? r.statusCode : void 0);
              return;
            }
            setSessionId(/[a-z\d-]+/.exec(r.headers["set-cookie"][0])[0]);
            return _this.http.post(postUrl, {
              Gebruikersnaam: _this.username,
              Wachtwoord: _this.password,
              IngelogdBlijven: _this._keepLoggedIn
            }, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }, function(error, result) {
              if (error != null) {
                return _this._setErrored(error, result != null ? result.statusCode : void 0);
              } else {
                setSessionId(/[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0]);
                return cb();
              }
            });
          };
        })(this));
      }
    };

    return Magister;

  })();

  root = (_ref7 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref7 : this.Magister != null ? this.Magister : this.Magister = {};

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
        return root.MessageFolder._convertRaw({
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

  root.Message = (function() {
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
      this.id = root._getset("_id");

      /**
      		 * @property body
      		 * @type String
      		 * @default ""
       */
      this.body = root._getset("_body", ((function(_this) {
        return function(x) {
          return _this._body = (x != null ? x : "").replace("\n", "<br>");
        };
      })(this)), root._helpers.cleanHtmlContent);

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = root._getset("_attachments");

      /**
      		 * The MessageFolder this Message in, changing this will move the Message.
      		 * @property messageFolder
      		 * @type MessageFolder
       */
      this.messageFolder = root._getset("_folderId", ((function(_this) {
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
      this.subject = root._getset("_subject", (function(_this) {
        return function(x) {
          return _this._subject = x;
        };
      })(this));

      /**
      		 * @property sender
      		 * @final
      		 * @type Person
       */
      this.sender = root._getset("_sender");

      /**
      		 * @property recipients
      		 * @final
      		 * @type Person[]
      		 * @default []
       */
      this.recipients = root._getset("_recipients");

      /**
      		 * @property sendDate
      		 * @final
      		 * @type Date|undefined
      		 * @default new Date()
       */
      this.sendDate = root._getset("_sendDate");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date|undefined
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date|undefined
       */
      this.end = root._getset("_end");

      /**
      		 * @property isRead
      		 * @type Boolean
      		 * @default false
       */
      this.isRead = root._getset("_isRead", (function(_this) {
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
      this.state = root._getset("_state");

      /**
      		 * @property isFlagged
      		 * @final
      		 * @type Boolean
       */
      this.isFlagged = root._getset("_isFlagged");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");
    }

    Message.prototype._tasks = 0;

    Message.prototype._sendAfterFinished = false;

    Message.prototype._finishedCallback = null;

    Message.prototype._isWorking = function() {
      return this._tasks !== 0;
    };

    Message.prototype._tickDown = function() {
      if (--this._tasks === 0 && this._sendAfterFinished) {
        return this.send(this._finishedCallback);
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
    	 * @param recipient {String|Person|Number|String[]|Person[]|Number[]} The recipient(s) to add.
    	 * @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for persons.
     */

    Message.prototype.addRecipient = function(recipient, type) {
      var p, person, _i, _len;
      if (_.isString(recipient)) {
        this._tasks++;
        this._magisterObj.getPersons(recipient, type, (function(_this) {
          return function(e, r) {
            if (e != null) {
              _this._reset();
              throw e;
            } else if (r.length !== 0) {
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
      } else if (_.isNumber(recipient)) {
        person = new root.Person(this._magisterObj, '', '');
        person._id = recipient;
        person._type = 3;
        this.recipients().push(person);
      } else {
        this._reset();
        throw new Error("Expected recipient to be a String, Number, or an Object, got a(n) " + (root._helpers["typeof"](recipient)));
      }
      return void 0;
    };


    /**
    	 * Creates a new Message that replies to the sender of the current Message.
    	 *
    	 * @method createReplyMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = [this.sender()];
      return msg;
    };


    /**
    	 * Creates a new Message that replies to the sender and recipients of the current Message.
    	 *
    	 * @method createReplyToAllMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyToAllMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = _.reject(this.recipients(), function(x) {
        return x.id() === this._magisterObj.profileInfo().id();
      }).concat([this.sender()]);
      return msg;
    };


    /**
    	 * Creates a new Message that forwards the current Message.
    	 *
    	 * @method createForwardMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createForwardMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("FW: ") !== 0 ? "FW: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      return msg;
    };


    /**
    	 * Sends the current Message. Sending will be delayed if there are processes running in the background.
    	 *
    	 * @method send
    	 * @param [cb] {Function} An optional callback.
    	 * 	@param [cb.error] {Object} An error, if it exists.
    	 * 	@param [cb.result] {Message} The sent message.
    	 * @return {Boolean} False if the sending is delayed, otherwise true.
     */

    Message.prototype.send = function(cb) {
      var error;
      if (this._isWorking()) {
        this._sendAfterFinished = true;
        this._finishedCallback = cb;
        return false;
      } else {
        error = function(str) {
          return root._helpers.defer(cb, new Error(str), null);
        };
        if (!this._canSend) {
          error('this message is marked as unsendable');
          return void 0;
        }
        if (!((this.recipients() != null) && (this.sender() != null))) {
          error('both sender and recipients must have a value');
          return void 0;
        }
        if (_.isEmpty(this.subject())) {
          error("subject can't be empty");
          return void 0;
        }
        this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten", this._toMagisterStyle(), {}, (function(_this) {
          return function(e, r) {
            if (e != null) {
              return typeof cb === "function" ? cb(e, null) : void 0;
            } else {
              return typeof cb === "function" ? cb(null, _this) : void 0;
            }
          };
        })(this));
        return true;
      }
    };


    /**
    	 * Move the current message to the given position.
    	 *
    	 * @method move
    	 * @param destination {Number|MessageFolder} The ID of a MessageFolder or the MessageFolder itself where to move this Message to.
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
    	 * @param [callback] {Function} An optional callback.
    	 * 	@param [callback.error] {Object} An error, if it exists.
     */

    Message.prototype.remove = function(cb) {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/" + (this.id()), {}, function(error, result) {
        return typeof cb === "function" ? cb(error) : void 0;
      });
    };


    /**
    	 * Downloads extra info, if it's not downloaded yet and fills the current
    	 * message with it.
    	 *
    	 * @method fillMessage
    	 * @param {Boolean} [fillPersons=false] Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Message} The current message filled with the newely downloaded info.
     */

    Message.prototype.fillMessage = function() {
      var callback, fillPersons, _ref8;
      fillPersons = (_ref8 = _.first(arguments)) != null ? _ref8 : false;
      callback = _.last(arguments);
      if (this._filled) {
        return root._helpers.defer(callback, null, this);
      } else if (callback != null) {
        return this._magisterObj.http.get(this._fillUrl, {}, (function(_this) {
          return function(error, result) {
            var a, parsed, pushPeople;
            if (error != null) {
              return typeof callback === "function" ? callback(error, null) : void 0;
            } else {
              parsed = JSON.parse(result.content);
              _this._body = parsed.Inhoud;
              _this._attachments = (function() {
                var _i, _len, _ref10, _ref9, _results;
                _ref10 = (_ref9 = parsed.Bijlagen) != null ? _ref9 : [];
                _results = [];
                for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
                  a = _ref10[_i];
                  _results.push(root.File._convertRaw(this._magisterObj, void 0, a));
                }
                return _results;
              }).call(_this);
              if (fillPersons) {
                pushPeople = root._helpers.asyncResultWaiter(m.recipients().length + 1, function() {
                  _this._filled = true;
                  return typeof callback === "function" ? callback(null, _this) : void 0;
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
                _this._filled = true;
                return typeof callback === "function" ? callback(null, _this) : void 0;
              }
            }
          };
        })(this));
      }
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
        var _i, _len, _ref8, _results;
        _ref8 = this._recipients;
        _results = [];
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          p = _ref8[_i];
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
      var o, obj, _ref8;
      obj = new root.Message(magisterObj);
      obj._id = raw.Id;
      obj._body = (_ref8 = raw.Inhoud) != null ? _ref8 : "";
      obj._folderId = raw.MapId;
      obj._subject = raw.Onderwerp;
      obj._sender = root.Person._convertRaw(magisterObj, raw.Afzender);
      obj._recipients = (function() {
        var _i, _len, _ref10, _ref9, _results;
        _ref10 = (_ref9 = raw.Ontvangers) != null ? _ref9 : [];
        _results = [];
        for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
          o = _ref10[_i];
          _results.push(root.Person._convertRaw(magisterObj, o));
        }
        return _results;
      })();
      obj._sendDate = root._helpers.parseDate(raw.VerstuurdOp);
      obj._begin = root._helpers.parseDate(raw.Begin);
      obj._end = root._helpers.parseDate(raw.Einde);
      obj._isRead = raw.IsGelezen;
      obj._state = raw.Status;
      obj._isFlagged = raw.HeeftPrioriteit;
      obj._type = raw.Soort;
      obj._canSend = false;
      obj._fillUrl = "" + magisterObj._personUrl + "/berichten/" + obj._id + "?berichtSoort=" + obj._type;
      return obj;
    };

    return Message;

  })();

  root = (_ref8 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref8 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A MessageFolder.
   *
   * @class MessageFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
   * @constructor
   */

  root.MessageFolder = (function() {
    function MessageFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property unreadMessagesCount
      		 * @final
      		 * @type Number
       */
      this.unreadMessagesCount = root._getset("_unreadMessagesCount");

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
    }


    /**
    	 * Gets the Messages of this MessageFolder.
    	 *
    	 * @method messages
    	 * @async
    	 * @param {Object} [options={}]
    	 * 	@param {Number} [options.limit=10] The limit of the amount of Messages to fetch.
    	 * 	@param {Number} [options.skip=0] The amount of messages in front to skip.
    	 * 	@param {String} [options.readState='all'] One of: 'all', 'read', 'unread'.
    	 * 	@param {Boolean} [options.fill=true] Whether or not to call `fillMessage` on every message.
    	 * 	@param {Boolean} [options.fillPersons=false] Whether or not to download the users from the server. `options.fill` has to be true for this option to take effect.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Message[]} An array containing the Messages.
     */

    MessageFolder.prototype.messages = function() {
      var callback, fill, fillPersons, limit, options, readState, skip, url;
      if (arguments.length === 0) {
        return void 0;
      } else if (arguments.length === 1) {
        options = {};
        callback = arguments[0];
      } else {
        options = arguments[0];
        callback = arguments[1];
      }
      limit = options.limit, skip = options.skip, readState = options.readState, fillPersons = options.fillPersons, fill = options.fill;
      if (limit == null) {
        limit = 10;
      }
      if (skip == null) {
        skip = 0;
      }
      if (readState == null) {
        readState = 'all';
      }
      if (fill == null) {
        fill = true;
      }
      if (fillPersons == null) {
        fillPersons = false;
      }
      if (limit === 0) {
        root._helpers.defer(callback, null, []);
        return void 0;
      }
      url = "" + this._magisterObj._personUrl + "/berichten?mapId=" + (this.id()) + "&top=" + limit + "&skip=" + skip;
      url += (function() {
        switch (readState) {
          case 'read':
            return '&gelezen=true';
          case 'unread':
            return '&gelezen=false';
          default:
            return '';
        }
      })();
      return this._magisterObj.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var m, messages, pushMessage, _fn, _i, _j, _len, _len1;
          if (error != null) {
            callback(error, null);
          } else {
            messages = (function() {
              var _i, _len, _ref9, _results;
              _ref9 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                m = _ref9[_i];
                _results.push(root.Message._convertRaw(this._magisterObj, m));
              }
              return _results;
            }).call(_this);
            pushMessage = root._helpers.asyncResultWaiter(messages.length, function(r) {
              return callback(null, _.sortBy(r, function(m) {
                return m.sendDate();
              }).reverse());
            });
            if (fill) {
              _fn = function(m) {
                return m.fillMessage(fillPersons, function(e, r) {
                  if (e != null) {
                    return callback(e, null);
                  } else {
                    return pushMessage(r);
                  }
                });
              };
              for (_i = 0, _len = messages.length; _i < _len; _i++) {
                m = messages[_i];
                _fn(m);
              }
            } else {
              for (_j = 0, _len1 = messages.length; _j < _len1; _j++) {
                m = messages[_j];
                pushMessage(m);
              }
            }
          }
          return void 0;
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
      var _ref9;
      callback = (_ref9 = (callback != null ? callback : query)) != null ? _ref9 : (function() {});
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
              var _i, _len, _ref10, _results;
              _ref10 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
                mF = _ref10[_i];
                _results.push(root.MessageFolder._convertRaw(this._magisterObj, mF));
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
        callback = (function() {});
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
            return callback(null, root.MessageFolder._convertRaw(_this._magisterObj, JSON.parse(result.content)));
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
      obj = new root.MessageFolder(magisterObj);
      obj._name = raw.Naam;
      obj._unreadMessagesCount = raw.OngelezenBerichten;
      obj._id = raw.Id;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return MessageFolder;

  })();

  root = (_ref9 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref9 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A Person.
   *
   * @class Person
   * @private
   * @param _magisterObj {Magister} A Magister object this Person is child of.
   * @param _firstName {String} The first name of the Person.
   * @param _lastName {String} The last name of the Person.
   * @constructor
   */

  root.Person = (function() {
    function Person(_magisterObj, _firstName, _lastName) {
      this._magisterObj = _magisterObj;
      this._firstName = _firstName;
      this._lastName = _lastName;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @type String
       */
      this.type = root._getset("_type", ((function(_this) {
        return function(val) {
          return _this._type = Person._convertType(val, true);
        };
      })(this)), Person._convertType);

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = root._getset("_fullName");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property group
      		 * @final
      		 * @type String
       */
      this.group = root._getset("_group");

      /**
      		 * @property teacherCode
      		 * @final
      		 * @type String
       */
      this.teacherCode = root._getset("_teacherCode");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = root._getset("_emailAddress");
    }

    Person.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.Type = (this._type === 4 ? 3 : this._type);
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

    Person._convertRaw = function(magisterObj, raw, type) {
      var obj, _ref10, _ref11;
      obj = new root.Person(magisterObj, raw.Voornaam, raw.Achternaam);
      obj._id = raw.Id;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._fullName = raw.Naam;
      obj._description = (_ref10 = (_ref11 = raw.Omschrijving) != null ? _ref11 : raw.Naam) != null ? _ref10 : raw.naam;
      obj._group = raw.Groep;
      obj._teacherCode = raw.Docentcode;
      obj._emailAddress = raw.Emailadres;
      obj._type = type != null ? type : raw.Type;
      return obj;
    };

    Person._convertType = function(original, setter) {
      if (setter == null) {
        setter = true;
      }
      if (setter) {
        if (_.isNumber(original)) {
          if (original !== 1 && original !== 2 && original !== 3 && original !== 6 && original !== 8) {
            throw new Error("Invalid value: '" + original + "'.");
          }
          return original;
        } else {
          switch (original.toLowerCase()) {
            case 'group':
              return 1;
            case 'study':
              return 2;
            case 'person':
            case 'teacher':
            case 'personnel':
            case 'pupil':
              return 3;
            case 'location':
              return 6;
            case 'project':
              return 8;
            default:
              throw new Error("Invalid value: \"" + original + "\".");
          }
        }
      } else {
        switch (original) {
          case 1:
            return 'group';
          case 2:
            return 'study';
          case 3:
            return 'person';
          case 6:
            return 'location';
          case 8:
            return 'project';
          default:
            return 'unknown';
        }
      }
    };

    return Person;

  })();

  root = (_ref10 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref10 : this.Magister != null ? this.Magister : this.Magister = {};


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

  root.ProfileInfo = (function() {
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
      this.id = root._getset("_id");

      /**
      		 * @property officialFirstNames
      		 * @final
      		 * @type String
       */
      this.officialFirstNames = root._getset("_officialFirstNames");

      /**
      		 * @property initials
      		 * @final
      		 * @type String
       */
      this.initials = root._getset("_initials");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property officialSurname
      		 * @final
      		 * @type String
       */
      this.officialSurname = root._getset("_officialSurname");

      /**
      		 * @property birthSurname
      		 * @final
      		 * @type String
       */
      this.birthSurname = root._getset("_birthSurname");

      /**
      		 * @property birthNamePrefix
      		 * @final
      		 * @type String
       */
      this.birthNamePrefix = root._getset("_birthNamePrefix");

      /**
      		 * @property useBirthname
      		 * @final
      		 * @type Boolean
       */
      this.useBirthname = root._getset("_useBirthname");

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

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
      		 * @type Date|undefined
       */
      this.birthDate = root._getset("_birthDate");

      /**
      		 * @property isChild
      		 * @final
      		 * @type Boolean
       */
      this.isChild = root._getset('_isChild');

      /**
      		 * @property isVisibleForParent
      		 * @final
      		 * @type Boolean
       */
      this.isVisibleForParent = root._getset('_isVisibleForParent');
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
      return "" + this._magisterObj._personUrl + "/foto?width=" + width + "&height=" + height + "&crop=" + crop;
    };


    /**
    	 * Fetch address info of the current user.
    	 * @method address
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {AddressInfo} The address info of the current user.
     */

    ProfileInfo.prototype.address = function(callback) {
      var url;
      url = "" + this._magisterObj._personUrl + "/adresprofiel";
      return this._magisterObj.http.get(url, {}, function(e, r) {
        var parsed;
        if (e != null) {
          return callback(e, null);
        } else {
          parsed = JSON.parse(r.content);
          return callback(null, root.AddressInfo._convertRaw(this._magisterObj, parsed));
        }
      });
    };


    /**
    	 * Fetch the profile settings of the current User.
    	 *
    	 * @method settings
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {ProfileSettings} The profile settings of the current User.
     */

    ProfileInfo.prototype.settings = function(callback) {
      var url;
      url = "" + this._magisterObj._personUrl + "/profiel";
      return this._magisterObj.http.get(url, {}, (function(_this) {
        return function(e, r) {
          var parsed;
          if (e != null) {
            return callback(e, null);
          } else {
            parsed = JSON.parse(r.content);
            return callback(null, root.ProfileSettings._convertRaw(_this._magisterObj, parsed));
          }
        };
      })(this));
    };

    ProfileInfo._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.ProfileInfo(magisterObj, raw.Roepnaam, raw.Achternaam, root._helpers.parseDate(raw.Geboortedatum));
      obj._id = raw.Id;
      obj._officialFirstNames = raw.OfficieleVoornamen;
      obj._initials = raw.Voorletters;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._officialSurname = raw.OfficieleAchternaam;
      obj._birthSurname = raw.GeboorteAchternaam;
      obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel;
      obj._useBirthname = raw.GebruikGeboortenaam;
      obj._isChild = raw.ZichtbaarVoorOuder != null;
      obj._isVisibleForParent = raw.ZichtbaarVoorOuder;
      return obj;
    };

    return ProfileInfo;

  })();


  /**
   * Settings related to the profile of the logged in user. Or a child.
   *
   * @class ProfileSettings
   * @private
   * @constructor
   */

  root.ProfileSettings = (function() {
    function ProfileSettings(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property redirectMagisterMessages
      		 * @type Boolean
       */
      this.redirectMagisterMessages = root._getset('_redirectMagisterMessages', (function(_this) {
        return function(x) {
          return _this._redirectMagisterMessages = x;
        };
      })(this));

      /**
      		 * @property emailAddress
      		 * @type String
       */
      this.emailAddress = root._getset('_emailAddress', (function(_this) {
        return function(x) {
          return _this._emailAddress = x;
        };
      })(this));

      /**
      		 * @property mobileNumber
      		 * @type String
       */
      this.mobileNumber = root._getset('_mobileNumber', (function(_this) {
        return function(x) {
          return _this._mobileNumber = x;
        };
      })(this));
    }


    /**
    	 * @method update
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
     */

    ProfileSettings.prototype.update = function(callback) {
      var url;
      url = "" + this._magisterObj._personUrl + "/profiel";
      return this._magisterObj.http.put(url, this._toMagisterStyle(), {}, function(e, r) {
        return callback(e);
      });
    };


    /**
    	 * @method _toMagisterStyle
    	 * @private
    	 * @return {Object}
     */

    ProfileSettings.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.EloBerichtenDoorsturen = this._redirectMagisterMessages;
      obj.EmailAdres = this._emailAddress;
      obj.Mobiel = this._mobileNumber;
      return obj;
    };

    ProfileSettings._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.ProfileSettings(magisterObj);
      obj._redirectMagisterMessages = raw.EloBerichtenDoorsturen;
      obj._emailAddress = raw.EmailAdres;
      obj._mobileNumber = raw.Mobiel;
      return obj;
    };

    return ProfileSettings;

  })();


  /**
   * Address info of the current logged in user. Or a child.
   *
   * @class AddressInfo
   * @private
   * @constructor
   */

  this.AddressInfo = (function() {
    function AddressInfo() {

      /**
      		 * @property postalCode
      		 * @final
      		 * @type String
       */
      this.postalCode = root._getset("_postalCode");

      /**
      		 * @property street
      		 * @final
      		 * @type String
       */
      this.street = root._getset("_street");

      /**
      		 * @property houseNumber
      		 * @final
      		 * @type Number
       */
      this.houseNumber = root._getset("_houseNumber");

      /**
      		 * String behind the `houseNumber` (eg 'A')
      		 *
      		 * @property suffix
      		 * @final
      		 * @type String
       */
      this.suffix = root._getset("_suffix");

      /**
      		 * @property city
      		 * @final
      		 * @type String
       */
      this.city = root._getset("_city");
    }

    AddressInfo._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.AddressInfo;
      obj._postalCode = raw.Postcode;
      obj._street = raw.Straatnaam;
      obj._houseNumber = raw.Huisnummer;
      obj._suffix = raw.Toevoeging;
      obj._city = raw.Woonplaats;
      return obj;
    };

    return AddressInfo;

  })();

  root = (_ref11 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref11 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A Magister school.
   *
   * @class MagisterSchool
   * @param name {String} The name of the school.
   * @param url {String} The URL of the school.
   * @constructor
   */

  root.MagisterSchool = (function() {

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
    	 * @method versionInfo
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Object}
    	 *			@param [callback.result.core] {String}
    	 *			@param [callback.result.api] {String}
    	 *			@param [callback.result.db] {String}
    	 *			@param [callback.result.product] {String}
    	 *			@param [callback.result.releasedOn] {Date}
     */

    MagisterSchool.prototype.versionInfo = function(callback) {
      return new root.MagisterHttp().get("" + this.url + "/api/versie", {}, function(e, r) {
        var parsed;
        if (e != null) {
          return callback(e, null);
        } else {
          parsed = JSON.parse(r.content);
          return callback(null, {
            core: parsed.CoreVersie,
            api: parsed.ApiVersie,
            db: parsed.DatabaseVersie,
            product: parsed.ProductVersie,
            releasedOn: root._helpers.parseDate(parsed.ReleaseDatum)
          });
        }
      });
    };


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
      if (!((query != null) && query.trim().length >= 3)) {
        callback(null, []);
        return;
      }
      query = query.replace(/\d/g, "").trim();
      return new root.MagisterHttp().get("https://mijn.magister.net/api/schools?filter=" + query, {}, (function(_this) {
        return function(error, result) {
          var s;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref12, _results;
              _ref12 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
                s = _ref12[_i];
                _results.push(this._convertRaw(s));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    MagisterSchool._convertRaw = function(raw) {
      return new root.MagisterSchool(raw.Id, raw.Name, raw.Url);
    };

    return MagisterSchool;

  })();

  root = (_ref12 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref12 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A StudyGuide, containing various Files and Links teachers can put on Magister.
   *
   * @class StudyGuide
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
   */

  root.StudyGuide = (function() {
    function StudyGuide(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date|undefined
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date|undefined
       */
      this.to = root._getset("_to");

      /**
      		 * @property classCodes
      		 * @final
      		 * @type String[]
       */
      this.classCodes = root._getset("_classCodes");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property archived
      		 * @final
      		 * @type Boolean
       */
      this.archived = root._getset("_archived");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");
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
          var id, p, pushResult, _i, _len, _ref13, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Onderdelen.Items;
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              return callback(null, r);
            });
            _ref13 = (function() {
              var _j, _len, _results1;
              _results1 = [];
              for (_j = 0, _len = result.length; _j < _len; _j++) {
                p = result[_j];
                _results1.push(p.Id);
              }
              return _results1;
            })();
            _results = [];
            for (_i = 0, _len = _ref13.length; _i < _len; _i++) {
              id = _ref13[_i];
              _results.push(_this._magisterObj.http.get("" + _this._magisterObj._pupilUrl + "/studiewijzers/" + (_this.id()) + "/onderdelen/" + id, {}, function(error, result) {
                var parsed, part;
                if (error != null) {
                  return callback(error, null);
                } else {
                  parsed = JSON.parse(result.content);
                  part = root.StudyGuidePart._convertRaw(_this._magisterObj, parsed);
                  return pushResult(part);
                }
              }));
            }
            return _results;
          }
        };
      })(this));
    };

    StudyGuide._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.StudyGuide(magisterObj);
      obj._id = raw.Id;
      obj._from = root._helpers.parseDate(raw.Van);
      obj._to = root._helpers.parseDate(raw.TotEnMet);
      obj._classCodes = raw.VakCodes;
      obj._class = raw.VakCodes[0];
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

  root.StudyGuidePart = (function() {
    function StudyGuidePart(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date|undefined
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date|undefined
       */
      this.to = root._getset("_to");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description", null, root._helpers.cleanHtmlContent);

      /**
      		 * @property visible
      		 * @final
      		 * @type Boolean
       */
      this.visible = root._getset("_visible");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");
    }

    StudyGuidePart._convertRaw = function(magisterObj, raw) {
      var f, obj, _ref13;
      obj = new root.StudyGuidePart(magisterObj);
      obj._id = raw.Id;
      obj._from = root._helpers.parseDate(raw.Van);
      obj._to = root._helpers.parseDate(raw.TotEnMet);
      obj._name = raw.Titel;
      obj._description = (_ref13 = raw.Omschrijving) != null ? _ref13 : "";
      obj._visible = raw.IsZichtbaar;
      obj._number = raw.Volgnummer;
      obj._files = (function() {
        var _i, _len, _ref14, _results;
        _ref14 = raw.Bronnen;
        _results = [];
        for (_i = 0, _len = _ref14.length; _i < _len; _i++) {
          f = _ref14[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      return obj;
    };

    return StudyGuidePart;

  })();

  root = (_ref13 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref13 : this.Magister != null ? this.Magister : this.Magister = {};


  /**
   * A utility class containing various helper methods.
   *
   * @static
   * @private
   * @class _helpers
   */

  root._helpers = (function() {
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
      return "" + (_helpers.addZero(d.getFullYear())) + "-" + (_helpers.addZero(d.getMonth() + 1)) + "-" + (_helpers.addZero(d.getDate())) + "T" + (_helpers.addZero(d.getHours())) + ":" + (_helpers.addZero(d.getMinutes())) + ":" + (_helpers.addZero(d.getSeconds())) + ".0000000Z";
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
          results = results.concat(result);
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


    /**
    	 * @method urlDateConvert
    	 * @param {Date} date
    	 * @return {String}
     */

    _helpers.urlDateConvert = function(date) {
      return "" + (date.getFullYear()) + "-" + (_helpers.addZero(date.getMonth() + 1)) + "-" + (_helpers.addZero(date.getDate()));
    };


    /**
    	 * @method date
    	 * @param {Date} date
    	 * @return {Date}
     */

    _helpers.date = function(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };


    /**
    	 * Strips HTML tags and entities from the given `str`
    	 * If `str` is `undefined` or `null` an empty string will be returned.
    	 *
    	 * @method cleanHtmlContent
    	 * @param {String} [str]
    	 * @return {String}
     */

    _helpers.cleanHtmlContent = function(str) {
      if (str != null) {
        return _.unescape(str).replace(/<br\s*\/?>/g, '\n').replace(/<\/\s*p\s*>/g, '\n').replace(/&nbsp;/g, ' ').replace(/(<[^>]*>)|(&#x200b;)/g, '').replace(/\r?\n/g, '\n').trim();
      } else {
        return '';
      }
    };


    /**
    	 * @method defer
    	 * @param {Function} callback
    	 * @param {mixed} args...
     */

    _helpers.defer = function() {
      var args, callback;
      callback = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((typeof Meteor !== "undefined" && Meteor !== null ? Meteor.defer : void 0) != null) {
        Meteor.defer(function() {
          return callback.apply(null, args);
        });
      } else if (typeof setImmediate !== "undefined" && setImmediate !== null) {
        setImmediate(function() {
          return callback.apply(null, args);
        });
      } else {
        _.defer.apply(_, [callback].concat(__slice.call(args)));
      }
      return void 0;
    };


    /**
    	 * Tries to parse `val` to a date, if it fails this function will return
    	 * `undefined` instead of an invalid date.
    	 *
    	 * @method parseDate
    	 * @param {any} val
    	 * @return {Date|undefined}
     */

    _helpers.parseDate = function(val) {
      var n;
      n = Date.parse(val);
      if (!isNaN(n)) {
        return val = new Date(n);
      }
    };

    _helpers["typeof"] = function(val) {
      if (_.isNull(val)) {
        return 'null';
      } else {
        return typeof val;
      }
    };

    return _helpers;

  })();

  root._getset = function(varName, setter, getter) {
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

  root = (_ref14 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref14 : this.Magister != null ? this.Magister : this.Magister = {};

  request = require("request");

  wrapCallback = function(cb, json) {
    return function(error, response, content) {
      if (json) {
        content = JSON.stringify(content);
      }
      if ((response != null ? response.statusCode : void 0) >= 400) {
        return cb(content, null);
      } else {
        return cb(error, {
          content: content,
          headers: response != null ? response.headers : void 0,
          statusCode: response != null ? response.statusCode : void 0
        });
      }
    };
  };

  root.MagisterHttp = (function() {
    function MagisterHttp() {}


    /*
    	 * HTTP CLASS
    	 * ======================
    	 *
    	 * You have to implement this with your own serverside implementation.
    	 * Beneath here are the requirements you have to follow.
    	 *
    	 * ======================
    	 *  MINIMAL REQUIREMENTS
    	 * ======================
    	 * callback: function (error, result) {...}
    	 * result: { content (string), headers (dictionary) }
    	 * options: { headers (dictionary), data (object) }
    	 *
    	 * get(url, options*, callback)
    	 * delete(url, options*, callback)
    	 * post(url, data, options*, callback)
    	 * put(url, data, options*, callback)
    	 *
    	 * * = optional (Fill with default value if null (object) ex.: options ?= {})
    	 *
    	 * Class holds variable _cookie which is required to be added to the headers
    	 *
    	 * ========================
    	 *  NODE.JS IMPLEMENTATION
    	 * ========================
     */

    MagisterHttp.prototype.get = function(url, options, callback) {
      if (options == null) {
        options = {};
      }
      request({
        url: url,
        method: "GET",
        headers: this._cookieInserter(options.headers)
      }, wrapCallback(callback, false));
      return void 0;
    };

    MagisterHttp.prototype["delete"] = function(url, options, callback) {
      if (options == null) {
        options = {};
      }
      request({
        url: url,
        method: "DELETE",
        headers: this._cookieInserter(options.headers)
      }, wrapCallback(callback, false));
      return void 0;
    };

    MagisterHttp.prototype.post = function(url, data, options, callback) {
      if (options == null) {
        options = {};
      }
      request({
        url: url,
        method: "POST",
        headers: this._cookieInserter(options.headers),
        json: data
      }, wrapCallback(callback, true));
      return void 0;
    };

    MagisterHttp.prototype.put = function(url, data, options, callback) {
      if (options == null) {
        options = {};
      }
      request({
        url: url,
        method: "PUT",
        headers: this._cookieInserter(options.headers),
        json: data
      }, wrapCallback(callback, true));
      return void 0;
    };

    MagisterHttp.prototype._cookie = '';

    MagisterHttp.prototype._cookieInserter = function(original) {
      return _.extend(original != null ? original : {}, {
        cookie: this._cookie
      });
    };

    return MagisterHttp;

  })();

}).call(this);

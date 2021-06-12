'use strict';

/**
 * Global Namespace for project
 * @namespace notifier
 */
var notifier = {
  interval: 15000,

  /**
   * Display the messages on the Admin Portal
   */
  displayAdmin: function () {
    $j.getJSON('/admin/tech/notifications/json/activenotification.json.html', function (messages) {
      messages.pop();
      notifier.notifications = messages;
      notifier.loadMessages();
    });
  },

  /**
   * Display the messages on the Guardian Portal
   */
  displayGuardian: function () {
    $j.getJSON('/guardian/notifier/json/activenotification.json.html', function (messages) {
      messages.pop();
      notifier.notifications = messages;
      notifier.loadMessages();
    });
  },

  /**
   * display the messages on the Subs Portal
   */
  displaySubs: function () {
    $j.getJSON('/subs/notifier/json/activenotification.json.html', function (messages) {
      messages.pop();
      notifier.notifications = messages;
      notifier.loadMessages();
    });
  },

  /**
   * display the messages on the Teachers Portal
   */
  displayTeachers: function () {
    $j.getJSON('/teachers/notifier/json/activenotification.json.html', function (messages) {
      messages.pop();
      notifier.notifications = messages;
      notifier.loadMessages();
    });
  },

  /**
   * Loads the messages into a div above the notification bar
   */
  loadMessages: function () {
    var i = 0,
      l = notifier.notifications.length;
    if (l > 0) {
      $j('#content-main').prepend('<div id="notification-alert">' + notifier.notifications[i].message + '</div>');
      if (l > 1) {
        setInterval(function () {
          if (i < (l - 1)) {
            i++;
          } else {
            i = 0;
          }
          $j('#notification-alert').text(notifier.notifications[i].message);
        }, notifier.interval);
      }
    }
  },

  /**
   * Populate the list of notifications
   */
  populateList: function () {
    $j.getJSON('json/listNotifications.json.html', function (result) {
      result.pop();
      $j(result).each(function (index, record) {
        $j('#notificationList tbody').append('<tr>' +
          '<td>' +
          '<a href="edit.html?id=' + record.id + '">' + record.message + '</a>' +
          '</td>' +
          '<td class="yes_no">' + record.adminPortal + '</td>' +
          '<td class="yes_no">' + record.teacherPortal + '</td>' +
          '<td class="yes_no">' + record.publicPortal + '</td>' +
          '<td class="yes_no">' + record.subPortal + '</td>' +
          '<td class="school_name">' + record.school + '</td>' +
          '<td class="list-date">' + record.startDate + '</td>' +
          '<td class="list-date">' + record.endDate + '</td>' +
          '<td class="yes_no">' + record.enabled + '</td>' +
          '</tr>');
      });
    });
  },

  /**
   * Sets the value of an input textbox or textarea
   * @param {string} value The value being passed to the text box
   * @param {string} field The id of the field being modified
   */
  setTextSelect: function (value, field) {
    $j('#' + field).val(value);
  },

  /**
   * Sets the value of a radio fieldset
   * @param {string} value The value being passed to the fieldset
   * @param {string} field The id of the fieldset containing the radio buttons
   */
  setRadio: function (value, field) {
    $j('#' + field + ' input:radio[value=' + value + ']').prop('checked', true);
  },

  /**
   * Sets the value of a checkbox
   * @param {string} value The value being passed to the checkbox
   * @param {string} field The id of the field being modified
   */
  setCheckBox: function (value, field) {
    if (value === '1') {
      $j('#' + field).prop('checked', true);
      $j('#' + field + '_cb').val(1);
    } else {
      $j('#' + field + '_cb').val(0);
    }
  },

  /**
   * Sets the value of a hidden input field
   * @param {string} value The value being passed to the hidden input field
   * @param {string} field The id of the field being modified
   */
  setHidden: function (value, field) {
    $j('#' + field).attr('value', value);
  },

  /**
   * Populate the page with a jsonString
   * @param {string} jsonString The URL of the file populating the page
   */
  populateForm: function (jsonString) {
    $j.getJSON(jsonString, function (formdata) {
      $j(':text,textarea,select').each(function () {
        notifier.setTextSelect(formdata[this.id], this.id);
      });
      $j(':checkbox').each(function () {
        notifier.setCheckBox(formdata[this.id], this.id);
      });
      $j('fieldset').each(function () {
        notifier.setRadio(formdata[this.id], this.id);
      });
      $j(':hidden').each(function () {
        notifier.setHidden(formdata[this.id], this.id);
      });
    });
  },

  /**
   * Sets the value of the hidden input which saves the checkbox value of 1 or 0
   */
  checkboxValues: function () {
    $j(':checkbox').on('change', function () {
      if (this.checked) {
        $j('#' + $j(this).attr('id') + '_cb').val(1);
      } else {
        $j('#' + $j(this).attr('id') + '_cb').val(0);
      }
    });
  },

  /**
   * Creates a hidden input of all checkboxes for which the value will be stored.
   */
  checkboxInputs: function () {
    $j(':checkbox').each(function () {
      $j(this).before('<input type="hidden" name="' + this.name + '" id="' + this.id + '_cb"/>').removeAttr('name');
    });
  },

  /**
   * Deletes the record from the notifications table
   */
  deleteRecord: function () {
    $j('#btnDelete').click(function () {
      $j('#deleteRecord').append(
          '<input type="hidden" name="DC-:0.U_NOTIFICATIONS.U_NOTIFICATIONS:' + notifier.options.id + '" value="on">' +
          '<input type="hidden" name="ac" value="prim">'
      );
      $j('#deleteRecord').submit();
    });
  },

  /**
   * Checks for errors and submits the page if none
   */
  submitClick: function () {
    $j('#btnSubmit').click(function () {
      if ($j('#message').val().length === 0) {
        $j('#message').focus();
        $j('#messageError').html('<p class="error-message" id="messageError">Message is required</p>');
      } else {
        $j('#notification').submit();
      }
    });
  },

  /**
   * Loads the edit.html page and inserts values into the form
   */
  loadEdit: function () {
    notifier.checkboxValues();
    notifier.checkboxInputs();
    notifier.deleteRecord();
    notifier.submitClick();
    notifier.populateForm('json/notification.json.html?id=' + notifier.options.id);
  }
};

System.register(['angular2/core', 'angular2/http', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1;
    var CollectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            CollectionComponent = (function () {
                function CollectionComponent(_http, _router, elementRef) {
					console.log("loaded ");
                    this._http = _http;
                    this._router = _router;
					this.setCookie();
					//this.setLocalStorage();
					this.UserID = DB.getItem("UserID");                    
                    //this.TrimmedUserID = this.UserID.slice(2, this.UserID.length);
                    this.TrimmedUserID = this.UserID.slice(2, this.UserID.length);
                    this.elementRef = elementRef;
                }
                 
    var headers = new http_1.Headers({ 'Content-Type': 'application/json', "Authorization":SPSWebToken });
    var options = new http_1.RequestOptions({ headers: headers });

                CollectionComponent.prototype.ngOnInit = function () {
                    //this.systemUrl = "https://"+ Token +".stoneprofits.com/api/fetchdataAngularProductionToyota.ashx";
                    this.systemUrl = "https://stage.stoneprofits.com/"+ Token +"/development/api/fetchdata.ashx";
                    document.getElementById('SendingMail').setAttribute("style", "display: none;");
                    document.getElementById('goBackID').setAttribute("style", "display: block;");
                    this.getSettings();
                    this.getCustomForm();
                    window.addEventListener('resize', this.adjustFormLayout.bind(this));

                    document.getElementById('headerId').innerHTML = "My <span id='CollectionBtnText'></span>";
                    this.gallery = null;

					$("title").text("My Collection | "+Company+"");
					$("meta[name='description']").attr("content", "View our wide selection of "+ Products +", and more at "+Company+"");
					$("meta[name='og:title']").attr("content",""+Company+" "+ Products +", and More ");
					$("meta[name='og:description']").attr("content", "View our wide selection of "+ Products +", and more at "+Company+"");
					$("meta[name='og:url']").attr("content", ""+Domain+"");
					$("meta[name='og:image']").attr("content", ""+ogImage+"");
                };

				CollectionComponent.prototype.setCookie = function () {
                    for(var i=0, len=DB.length; i<len; i++) {
						var key = DB.key(i);
						var value = DB[key];
						if(key != 'UserID' || this.getCookie(key) == "")
						document.cookie = key + "=" + value + ";";
					}
                };

				/*CollectionComponent.prototype.setLocalStorage = function () {
					DB.clear();
					var keyValuePairs = document.cookie.split(';');
					console.log(keyValuePairs)

					for(var i = 0; i < keyValuePairs.length; i++) {
						var name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
						var value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);
						DB.setItem(name.replace(' ',''), value);

					}
				}*/

				CollectionComponent.prototype.getCookie = function (cname){
					var name = cname + "=";
					var ca = document.cookie.split(';');
					for(var i = 0; i < ca.length; i++) {
						var c = ca[i];
						while (c.charAt(0) == ' ') {
							c = c.substring(1);
						}
						if (c.indexOf(name) == 0) {
							return c.substring(name.length, c.length);
						}
					}
					return "";
				}
				CollectionComponent.prototype.ngAfterContentChecked = function () {
					var userAgent, ieReg, ie;
					userAgent = window.navigator.userAgent;
					ieReg = /msie|Trident.*rv[ :]*11\./gi;
					ie = ieReg.test(userAgent);
					if(ie) {						
					  $(".ImgWrap").each(function () {
						var $container = $(this),
							imgUrl = $container.find("img").prop("src");
						if (imgUrl) {
						  $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("ms-object-fit");
						}
					  });
					}
				};
                CollectionComponent.prototype.showGallery = function () {
                    //if (this.counter) {
                    if (this.gallery != null) {
                        this.gallery.data('lightGallery').destroy(true);
                    }
                    this.gallery = jQuery(this.elementRef.nativeElement).find('#ItemGallery');
                    this.gallery.lightGallery({ selector: '.Gallery', loop: false, download: false, mode: 'lg-slide', width: '1024px',thumbnail: false, hash: false, share: false, actualSize: false });
                    //  this.counter = false;        
                };
                CollectionComponent.prototype.getSettings = function () {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getSettings&WebconnectSettingID='+ WebconnectSettingID +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.WCSettings = data; }, function (err) { return _this.logError(err); }, function () { return _this.getItemsInCollection(_this.TrimmedUserID); });
                };
                CollectionComponent.prototype.getItemsInCollection = function (TrimmedUserID) {
                    var _this = this;
					var showLocation = '';
					if(this.WCSettings[0]["ShowLocationinGallery"] == 'on')
					showLocation = 'on';
                    document.getElementById('myNav').setAttribute("style", "display: none;");
                    this._http.get(this.systemUrl + '?act=getItemsInCollection&InventoryGroupBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') + '&TrimmedUserID=' + TrimmedUserID +'&showLocation='+ showLocation +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.ItemsInCollection = data; }, function (err) { return _this.logError(err); }, function () { return _this.getCompanyInfo(); });
                };
                CollectionComponent.prototype.getCompanyInfo = function () {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCompanyInfo' +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.CompanyInfo = data; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCountOnly(_this.TrimmedUserID); });
                };
                CollectionComponent.prototype.logError = function (err) {
                    console.error("There was an error:" + err);
                };
                CollectionComponent.prototype.RemoveFromCollection = function (Inventory) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=RemoveFromWebCart&WebCartID=' + Inventory.WebCartID , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return Inventory.WebCartID = 0; }, function (err) { return _this.logError(err); }, function () { return _this.getCartCount(_this.TrimmedUserID); });
                };
                CollectionComponent.prototype.getCartCount = function (Uid) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCartCount&Uid=' + Uid +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); }) 
                        .subscribe(function (data) { return _this.CartCount = data; }, function (err) { return _this.logError(err); }, function () { return _this.gotoCollection(); });
                };
				CollectionComponent.prototype.getCartCountOnly = function (Uid) {
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCartCount&Uid=' + Uid +'&q=' + new Date().getTime() , options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { _this.CartCount = data; document.getElementById('countId').innerHTML = _this.CartCount[0].Count; }, function (err) { return _this.logError(err); }, function () { console.log(_this.CartCount[0].Count)});
                };
                CollectionComponent.prototype.gotoCollection = function () {
                    document.getElementById('countId').innerHTML = this.CartCount[0].Count;
                    if (document.getElementById('countId').innerHTML == '0') {
                        location.href = location.href.split('Collection')[0];
                    }
                    else {
                        this.ngOnInit();
                        this.showGallery();
                    }
                };
                CollectionComponent.prototype.goToHome = function () {
                    document.getElementById('SendingMail').setAttribute("style", "display: none;");
                    alert("Email sent successfully");
                    DB.setItem('UserID', (Math.random()).toString());
                    var url = location.href;
                    var to = url.lastIndexOf('/');
                    to = to == -1 ? url.length : to + 1;
                    url = url.substring(0, to);
                    location.href = url;
                };
                CollectionComponent.prototype.ValidateFirstEmail = function () {
                    if (document.getElementById('txtEmail1').value) {
                        var x = document.getElementById('txtEmail1').value;
                        var atpos = x.indexOf('@');
                        var dotpos = x.lastIndexOf('.');
                        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                            alert('Not a valid e-mail address');
                            document.getElementById('txtEmail1').focus();
                        }
                    }
                    else {
                        alert('Enter Recipient-1 Email ID');
                        document.getElementById('txtEmail1').focus();
                    }
                };
                // ... (previous code remains the same until getCustomForm method)

                CollectionComponent.prototype.getCustomForm = function () {
                    console.log("MrX")
                    var _this = this;
                    this._http.get(this.systemUrl + '?act=getCustomForm&q=' + new Date().getTime(), options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { 
                            console.log("custom form data", data);
                            _this.generateForm(data); // Call generateForm with the data
                        }, function (err) { return _this.logError(err); });
                };

                CollectionComponent.prototype.generateForm = function (fields) {
                    console.log("Entering Form generator");
                    var _this = this;
                    var formContainer = document.getElementById('customForm');
                    formContainer.innerHTML = '';

                    if (!formContainer || !fields || !Array.isArray(fields)) {
                        console.error('Invalid parameters provided to generateForm');
                        return;
                    }

                    var rowsMap = this.groupFieldsByRow(fields);

                    Object.keys(rowsMap)
                        .sort(function (a, b) { return parseInt(a) - parseInt(b); })
                        .forEach(function (rowKey) {
                            var rowElement = _this.createFormRow(rowsMap[rowKey]);
                            if (rowElement) {
                                formContainer.appendChild(rowElement);
                            }
                        });
                };

                CollectionComponent.prototype.groupFieldsByRow = function (fields) {
                    return fields.reduce(function (acc, field) {
                        var row = field.RowNumber || 0;
                        if (!acc[row]) acc[row] = [];
                        acc[row].push(field);
                        return acc;
                    }, {});
                };

                CollectionComponent.prototype.createFormRow = function (rowFields) {
                    var rowDiv = document.createElement('div');
                    rowDiv.className = 'form-row col-sm-12';
                    rowDiv.style.display = 'flex';

                    var totalWidth = rowFields.reduce(function (sum, field) {
                        return sum + (parseInt(field.AttributeSize) || 100);
                    }, 0);

                    var _this = this;
                    rowFields.forEach(function (field) {
                        var fieldElement = _this.createFormField(field, totalWidth);
                        if (fieldElement) {
                            rowDiv.appendChild(fieldElement);
                        }
                    });

                    return rowDiv;
                };

                CollectionComponent.prototype.createFormField = function (field, totalWidth) {
                    var fieldWidth = (parseInt(field.AttributeSize) || 100 / totalWidth * 100);

                    var groupDiv = document.createElement('div');
                    groupDiv.className = 'form-group';
                    groupDiv.style.flex = '0 0 ' + fieldWidth + '%';

                    var label = this.createLabel(field);
                    groupDiv.appendChild(label);

                    var input = this.createInput(field);
                    if (input) {
                        groupDiv.appendChild(input);
                    }

                    return groupDiv;
                };

                CollectionComponent.prototype.createLabel = function (field) {
                    var label = document.createElement('label');
                    label.textContent = field.AttributeName || '';
                    label.htmlFor = 'field-' + field.ID;

                    if (field.IsRequired) {
                        var asterisk = document.createElement('span');
                        asterisk.className = 'required-asterisk';
                        asterisk.textContent = ' *';
                        asterisk.setAttribute('aria-hidden', 'true');
                        label.appendChild(asterisk);
                    }

                    return label;
                };

                CollectionComponent.prototype.createInput = function (field) {
                    var attrType = (field.AttributeType || '').toLowerCase();
                    var dataType = (field.DataType || '').toLowerCase();
                    var fieldName = (field.AttributeName || '').toLowerCase();

                    var input;
                    switch (attrType) {
                        case 'select':
                        case 'dropdown':
                            input = this.createSelectInput(field);
                            break;
                        case 'checkbox':
                        case 'check box':
                        case 'boolean':
                            input = this.createCheckboxInput(field);
                            break;
                        case 'textarea':
                        case 'text area':
                            input = this.createTextareaInput(field);
                            break;
                        case 'radio':
                        case 'yes/no':
                            input = this.createRadioInput(field);
                            break;
                        case 'multiselect':
                        case 'multiple checkbox':
                            input = this.createMultiselectInput(field);
                            break;
                        default:
                            input = this.createDefaultInput(field, attrType, dataType, fieldName);
                    }

                    if (input) {
                        input.id = 'field-' + field.ID;
                        input.name = field.AttributeName ? field.AttributeName.replace(/\s+/g, '-') : '';
                        input.required = field.IsRequired === "on";

                        if (field.AttributeOptions) {
                            input.placeholder = field.AttributeOptions.split(',')[0];
                        }
                    }

                    return input;
                };

                CollectionComponent.prototype.createSelectInput = function (field) {
                    var select = document.createElement('select');

                    if (field.AttributeOptions) {
                        var _this = this;
                        field.AttributeOptions.split(',').forEach(function (opt) {
                            var option = document.createElement('option');
                            option.value = option.textContent = opt.trim();
                            select.appendChild(option);
                        });
                    }

                    return select;
                };

                CollectionComponent.prototype.createCheckboxInput = function (field) {
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'checkbox-input';
                    return checkbox;
                };

                CollectionComponent.prototype.createTextareaInput = function (field) {
                    var textarea = document.createElement('textarea');
                    textarea.rows = 3;
                    return textarea;
                };

                CollectionComponent.prototype.createRadioInput = function (field) {
                    var container = document.createElement('div');
                    container.className = 'radio-group';

                    var options = field.AttributeType === 'yes/no' ? ['Yes', 'No'] :
                        field.AttributeOptions ? field.AttributeOptions.split(',') : [];

                    var _this = this;
                    options.forEach(function (option) {
                        var optionId = field.ID + '-' + option.toLowerCase();

                        var radioWrapper = document.createElement('div');
                        radioWrapper.className = 'radio-option';

                        var radio = document.createElement('input');
                        radio.type = 'radio';
                        radio.id = optionId;
                        radio.name = field.AttributeName.replace(/\s+/g, '-');
                        radio.value = option;

                        var label = document.createElement('label');
                        label.htmlFor = optionId;
                        label.textContent = option;

                        radioWrapper.appendChild(radio);
                        radioWrapper.appendChild(label);
                        container.appendChild(radioWrapper);
                    });

                    return container;
                };

                CollectionComponent.prototype.createMultiselectInput = function (field) {
                    var container = document.createElement('div');
                    container.className = 'CheckBoxFilter col-sm-12';
                    container.id = 'field-' + field.ID;
                    
                    var toggleHeader = document.createElement('p');
                    toggleHeader.textContent = 'Select Options';
                    
                    var iconSpan = document.createElement('span');
                    iconSpan.className = 'icon-plusthin';
                    iconSpan.id = field.AttributeName.replace(/\s+/g, '') + 'Img';
                    toggleHeader.appendChild(iconSpan);
                    
                    var _this = this;
                    toggleHeader.addEventListener('click', function() {
                        var isOpen = iconSpan.classList.contains('icon-minusthin');
                        var checkboxes = container.querySelectorAll('.SPSCheckBox');
                        
                        iconSpan.classList.toggle('icon-minusthin', !isOpen);
                        iconSpan.classList.toggle('icon-plusthin', isOpen);
                        
                        checkboxes.forEach(function(checkbox) {
                            checkbox.style.display = isOpen ? 'none' : 'block';
                        });
                    });
                    
                    container.appendChild(toggleHeader);
                    
                    if (field.AttributeOptions) {
                        var options = field.AttributeOptions.split(',');
                        options.forEach(function(option, index) {
                            var optionDiv = document.createElement('div');
                            optionDiv.className = field.AttributeName.replace(/\s+/g, '') + 'SPSCheckBox SPSCheckBox col-sm-6 col-md-12';
                            optionDiv.style.display = 'none';
                            
                            var input = document.createElement('input');
                            input.type = 'checkbox';
                            input.name = field.AttributeName.replace(/\s+/g, '') + '_Check';
                            input.value = index + 1;
                            input.id = field.AttributeName.replace(/\s+/g, '') + 'Check' + (index + 1);
                            input.className = 'ng-untouched ng-pristine ng-valid';
                            
                            var label = document.createElement('label');
                            label.htmlFor = input.id;
                            
                            var labelText = document.createElement('p');
                            labelText.textContent = option.trim();
                            label.appendChild(labelText);
                            
                            optionDiv.appendChild(input);
                            optionDiv.appendChild(label);
                            container.appendChild(optionDiv);
                        });
                    }
                    
                    return container;
                };

                CollectionComponent.prototype.createDefaultInput = function (field, attrType, dataType, fieldName) {
                    var input = document.createElement('input');

                    if (fieldName.includes('email')) {
                        input.type = 'email';
                    } else if (fieldName.includes('phone') || fieldName.includes('tel')) {
                        input.type = 'tel';
                    } else if (fieldName.includes('date') || dataType === 'datetime') {
                        input.type = 'date';
                    } else if (dataType === 'url' || fieldName.includes('url')) {
                        input.type = 'url';
                    } else if (dataType === 'decimal' || dataType === 'currency') {
                        input.type = 'number';
                        input.step = '0.01';
                    } else if (dataType === 'integer') {
                        input.type = 'number';
                        input.step = '1';
                    } else {
                        input.type = 'text';
                    }

                    return input;
                };

                CollectionComponent.prototype.adjustFormLayout = function () {
                    var formRows = document.querySelectorAll('.form-row');
                    var isMobileView = window.innerWidth < 768;
                
                    formRows.forEach(function(row) {
                        var formGroups = row.querySelectorAll('.form-group');
                        
                        if (isMobileView) {
                            // Mobile view - remove flex and stack vertically
                            row.style.display = 'block'; // Removes flex layout
                            row.style.flexDirection = '';
                            
                            formGroups.forEach(function(group) {
                                group.style.width = '100%';
                                group.style.marginRight = '0';
                                group.style.marginBottom = '15px';
                                
                                var input = group.querySelector('input, select, textarea');
                                if (input) {
                                    input.style.width = '100%';
                                }
                            });
                        } else {
                            // Desktop view - use flex for horizontal layout
                            row.style.display = 'flex';
                            row.style.flexDirection = 'row';
                            
                            formGroups.forEach(function(group) {
                                group.style.width = '';
                                group.style.marginRight = '15px';
                                group.style.marginBottom = '0';
                                
                                var input = group.querySelector('input, select, textarea');
                                if (input) {
                                    input.style.width = '';
                                }
                            });
                        }
                    });
                };
               
                CollectionComponent.prototype.toCount = function () {
                    var entranceObj = document.getElementById('txtMessage');
                    var exitObj = document.getElementById('remainingChars');
                    var characters = 1000;
                    var length = characters - entranceObj.value.length;
                    if (length <= 0) {
                        length = 0;
                        entranceObj.value = entranceObj.value.substr(0, characters);
                    }
                    exitObj.innerHTML = "Characters Remaining: " + length.toString();
                };
                CollectionComponent.prototype.sendMail = function () {
                    var _this = this;
                    var HomeLocation;
					var DistinctIDs = [...new Set(_this.ItemsInCollection.map(x => x.LocationID ))];
					var LocIDs =  DistinctIDs.toString();
                    HomeLocation = location.href.split('Collection')[0];
                    var EmailID;
                    var Message;
                    if ("" + document.getElementById('txtEmail1').value != "" && "" + document.getElementById('txtEmail2').value != "") {
                        EmailID = "" + document.getElementById('txtEmail1').value + ", " + document.getElementById('txtEmail2').value + ",";
                    }
                    else if ("" + document.getElementById('txtEmail1').value != "") {
                        EmailID = "" + document.getElementById('txtEmail1').value + ",";
                    }
                    else if ("" + document.getElementById('txtEmail2').value != "") {
                        EmailID = "" + document.getElementById('txtEmail2').value + ",";
                    }
                    Message = "" + document.getElementById('txtMessage').value;
					Message = Message.split("\n").join("<br />");

				    Message = Message.replaceAll("'", '')

                    // Sanitize the message
                    //  Message = encodeURIComponent(Message.replaceAll("'", '').replace(/[^a-zA-Z0-9 \-_=.,@/()*?\n&]/g, ' ').split(/\n/).map(line => line.split(' ').filter(word => !['update', 'insert', 'delete', 'alter', 'drop', 'grant', 'revoke', 'truncate', 'rename', 'commit', 'rollback', 'savepoint', 'sys', 'exec', 'htaccess', 'script', 'iframe', 'alert', 'input', 'eval', 'document', 'write', '--'].includes(word.toLowerCase())).join(' ')).join('\n'));

                    

                    if (EmailID == undefined) {
                        alert("Please provide atleast one Email Id to send an email.");
                    }
                    else {
                        if (document.getElementById('txtEmail1').value) {
                            var x1 = document.getElementById('txtEmail1').value;
                            var atpos1 = x1.indexOf("@");
                            var dotpos1 = x1.lastIndexOf(".");
                            if (atpos1 < 1 || dotpos1 < atpos1 + 2 || dotpos1 + 2 >= x1.length) {
                                alert("Not a valid e-mail address");
								$("#txtEmail1").focus();
                            }
                            else {
                                if (document.getElementById('txtEmail2').value) {
                                    var x2 = document.getElementById('txtEmail2').value;
                                    var atpos2 = x2.indexOf("@");
                                    var dotpos2 = x2.lastIndexOf(".");
                                    if (atpos2 < 1 || dotpos2 < atpos2 + 2 || dotpos2 + 2 >= x2.length) {
                                        alert("Not a valid e-mail address");
										$("#txtEmail1").focus();
                                    }
                                    else {
                                        if (document.getElementById('countId').innerHTML != "0" && document.getElementById('countId').innerHTML != "") {
                                            document.getElementById('SendingMail').setAttribute("style", "display: display;");
                                            this._http.get(this.systemUrl + '?act=sendMail&InventoryGroupBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') + '&HomeLocation=' + HomeLocation + '&IDOneLable=' + this.WCSettings[0]["IDOneLable"] + '&IDTwoLable=' + this.WCSettings[0]["IDTwoLable"] + '&IDThreeLable=' + this.WCSettings[0]["IDThreeLable"] + '&SerialPrefixLable=' + this.CompanyInfo[0]["SerialPrefixLable"] + '&CompanyTitle=' + this.CompanyInfo[0]["CompanyTitle"] + '&Address1=' + this.CompanyInfo[0]["Address1"] + '&Address2=' + this.CompanyInfo[0]["Address2"] + '&City=' + this.CompanyInfo[0]["City"] + '&State=' + this.CompanyInfo[0]["State"] + '&Zip=' + this.CompanyInfo[0]["Zip"] + '&Phone1=' + this.CompanyInfo[0]["Phone1"] + '&Fax=' + this.CompanyInfo[0]["Fax"] + '&TrimmedUserID=' + this.TrimmedUserID + '&EmailID=' + EmailID + '&Message=' + Message+ '&LocIDs='+LocIDs, options)
                                                .map(function (res) { return res.json(); })
                                                .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.error(); }, function () { return _this.goToHome(); });
                                        }
                                        else {
                                            alert("Please add atleast one material to the collection to send an email.");
                                            document.getElementById('SendingMail').setAttribute("style", "display: none;");
                                        }
                                    }
                                }
                                else {
                                    if (document.getElementById('countId').innerHTML != "0" && document.getElementById('countId').innerHTML != "") {
                                        document.getElementById('SendingMail').setAttribute("style", "display: display;");
                                        this._http.get(this.systemUrl + '?act=sendMail&InventoryGroupBy=' + this.WCSettings[0]["GroupInventoryBy"].replace(/,/g, '_') + '&HomeLocation=' + HomeLocation + '&IDOneLable=' + this.WCSettings[0]["IDOneLable"] + '&IDTwoLable=' + this.WCSettings[0]["IDTwoLable"] + '&IDThreeLable=' + this.WCSettings[0]["IDThreeLable"] + '&SerialPrefixLable=' + this.CompanyInfo[0]["SerialPrefixLable"] + '&CompanyTitle=' + this.CompanyInfo[0]["CompanyTitle"] + '&Address1=' + this.CompanyInfo[0]["Address1"] + '&Address2=' + this.CompanyInfo[0]["Address2"] + '&City=' + this.CompanyInfo[0]["City"] + '&State=' + this.CompanyInfo[0]["State"] + '&Zip=' + this.CompanyInfo[0]["Zip"] + '&Phone1=' + this.CompanyInfo[0]["Phone1"] + '&Fax=' + this.CompanyInfo[0]["Fax"] + '&TrimmedUserID=' + this.TrimmedUserID + '&EmailID=' + EmailID + '&Message=' + Message+ '&LocIDs='+LocIDs , options)
                                            .map(function (res) { return res.json(); })
                                            .subscribe(function (data) { return _this.MailData = data; }, function (err) { return _this.error(); }, function () { return _this.goToHome(); });
                                    }
                                    else {
                                        alert("Please add atleast one material to the collection to send an email.");
                                        document.getElementById('SendingMail').setAttribute("style", "display: none;");
                                    }
                                }
                            }
                        }
                    }
                };
                CollectionComponent.prototype.error = function () {
                    // alert("Some thing went wrong, Email was not sent!");
                    alert("The email was not sent. Please contact us for assistance.");
                    document.getElementById('SendingMail').setAttribute("style", "display: none;");
                };
                CollectionComponent = __decorate([
                    core_1.Component({
                        selector: 'Collection',
                        templateUrl: collectionHtmlPage
                        //templateUrl: './app/Collection/collection.html'
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router, core_1.ElementRef])
                ], CollectionComponent);
                return CollectionComponent;
            }());
            exports_1("CollectionComponent", CollectionComponent);
        }
    }
});
//# sourceMappingURL=collection.component.js.map

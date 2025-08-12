import React, { useState, useEffect } from 'react';
import { Send, Search, Wifi, Battery, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Settings, Plus, User, Trash2, X } from 'lucide-react';
import AddMeterModal from '../components/meterManagement/AddMeterModal';
import { useDispatch, useSelector } from 'react-redux';
import { addActionHistoryToMeter, selectIotMeters, selectMeteringMeters } from '../redux/slice/meterManagementSlice';
import { fetchMeters, fetchUnassignedIoTMeters } from '../redux/thunks/meterThunks';
import { sendDownlinlkCommand } from '../redux/thunks/meterManagementThunks';
import { userAllData,userQueryData } from '../redux/slice/userMangementSlice';
import { toast } from 'react-toastify';



const MeterManagement = () => {
  // State declarations

  const dispatch = useDispatch();
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [commandType, setCommandType] = useState('');
  const [customPayload, setCustomPayload] = useState('');
  const [port, setPort] = useState(1);
  const [confirmed, setConfirmed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sending, setSending] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [selectedParams, setSelectedParams] = useState({});
  const [showAddMeterModal, setShowAddMeterModal] = useState(false);
  const [newMeters, setNewMeters] = useState([{ meterId: '', rs485Id: '' }]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userSearch, setUserSearch] = useState('');




  useEffect(() => {
    dispatch(fetchMeters());
    dispatch(fetchUnassignedIoTMeters());
  }, []);

  // Selectors
  const unasignedIOTMeter = useSelector(selectIotMeters);
  const meteringMeter = useSelector(selectMeteringMeters);
  const users = useSelector(userQueryData);
  console.log("all users------------------>", users);

  
  useEffect(() => {
    if (selectedMeter && selectedMeter.actionHistory) {
      // Convert meter's actionHistory to commandHistory format
      const formattedHistory = selectedMeter.actionHistory;

      setCommandHistory(formattedHistory);
    } else {
      setCommandHistory([]);
    }
  }, [selectedMeter]);
  const commandTemplates = {
    forced_eb: {
      name: 'Force EB',
      description: 'Force switch to EB supply',
      payload: 'AA060010',
      params: []
    },
    forced_dg: {
      name: 'Force DG',
      description: 'Force switch to DG supply',
      payload: '',
      params: []
    },
    forced_eb_dg_reset: {
      name: 'Reset EB/DG Force State',
      description: 'Reset forced EB/DG state',
      payload: '',
      params: []
    },
    balance_deduct_random: {
      name: 'Random Balance Deduct',
      description: 'Deduct random balance',
      payload: '',
      params: []
    },
    run_eb_only: {
      name: 'Run EB Only',
      description: 'Switch to EB only mode',
      payload: 'AA0600140000D015',
      params: []
    },
    run_dg_only: {
      name: 'Run DG Only',
      description: 'Switch to DG only mode',
      payload: '',
      params: []
    },
    run_eb_dg_only_reset: {
      name: 'Reset EB/DG Only',
      description: 'Reset EB/DG only state',
      payload: '',
      params: []
    },
    set_happy_day: {
      name: 'Set Happy Day',
      description: 'Mark happy day for tariff',
      payload: '',
      params: []
    },
    set_happy_hour: {
      name: 'Set Happy Hour',
      description: 'Mark happy hour for tariff',
      payload: '',
      params: []
    },
    emergency_button_reset: {
      name: 'Reset Emergency Button',
      description: 'Reset emergency button state',
      payload: '',
      params: []
    },
    set_monthly_deduct_tariff: {
      name: 'Set Monthly Deduct Tariff',
      description: 'Configure monthly deduction',
      payload: 'AA06001A{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 100 }
      ]
    },
    set_meter_id: {
      name: 'Set Meter ID',
      description: 'Assign a meter ID',
      payload: 'AA06001B{meterId}',
      params: [
        { name: 'meterId', type: 'text', default: '0001' }
      ]
    },
    update_overload_dg: {
      name: 'Update Overload DG',
      description: 'Update overload setting for DG',
      payload: 'AA060021{value}',
      params: [
        { name: 'value', type: 'number', min: 0, max: 65535, step: 1, default: 1000 }
      ]
    },
    update_overload_eb: {
      name: 'Update Overload EB',
      description: 'Update overload setting for EB',
      payload: 'AA060022{value}',
      params: [
        { name: 'value', type: 'number', min: 0, max: 65535, step: 1, default: 1000 }
      ]
    },
    update_tariff_dg: {
      name: 'Update Tariff DG',
      description: 'Update unit tariff for DG supply',
      payload: 'AA060023{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 10 }
      ]
    },
    update_tariff_eb: {
      name: 'Update Tariff EB',
      description: 'Update unit tariff for EB supply',
      payload: 'AA060024{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 5 }
      ]
    },
    recharge_balance: {
      name: 'Recharge Balance',
      description: 'Recharge consumer balance',
      payload: 'AA060025{amount}',
      params: [
        { name: 'amount', type: 'number', min: 1, max: 10000, step: 1, default: 100 }
      ]
    },
    set_daily_deduct_tariff: {
      name: 'Set Daily Deduct Tariff',
      description: 'Set tariff for daily deduction',
      payload: 'AA060026{tariff}',
      params: [
        { name: 'tariff', type: 'number', min: 0, max: 9999, step: 1, default: 50 }
      ]
    },
    set_overload_max_attempt: {
      name: 'Set Overload Max Attempt',
      description: 'Set max retry count after overload',
      payload: 'AA060027{attempts}',
      params: [
        { name: 'attempts', type: 'number', min: 1, max: 10, step: 1, default: 3 }
      ]
    },
    set_overload_attempt_wait_time: {
      name: 'Set Overload Wait Time',
      description: 'Set wait time (in seconds) after overload',
      payload: 'AA060028{time}',
      params: [
        { name: 'time', type: 'number', min: 1, max: 3600, step: 1, default: 30 }
      ]
    },
    forced_relay_on: {
      name: 'Forced Relay ON',
      description: 'Turn on the relay manually',
      payload: 'AA060029000041D9',
      params: []
    },
    forced_relay_off: {
      name: 'Forced Relay OFF',
      description: 'Turn off the relay manually',
      payload: 'AA06002A00017019',
      params: []
    },
    forced_relay_clear: {
      name: 'Forced Relay Clear',
      description: 'Clear forced relay state',
      payload: '',
      params: []
    },
    forced_individual_relay_dg: {
      name: 'Forced Individual Relay DG',
      description: 'Control individual DG relay',
      payload: '',
      params: []
    },
    forced_individual_relay_eb: {
      name: 'Forced Individual Relay EB',
      description: 'Control individual EB relay',
      payload: '',
      params: []
    },
    clear_balance: {
      name: 'Clear Balance',
      description: 'Zero out the balance',
      payload: 'AA06003F0000A01D',
      params: []
    },
    clear_overload_fault: {
      name: 'Clear Overload Fault',
      description: 'Clear the overload trip/fault state',
      payload: 'AA06001C000051D7',
      params: []
    },
    custom: {
      name: 'Custom Command',
      description: 'Send raw HEX command manually',
      payload: '',
      params: [
        { name: 'payload', type: 'text', default: '' }
      ]
    }
  };

  // Filter meters based on search term
  const filteredMeters = meteringMeter.filter(meter =>
    (meter?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (meter?.id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (meter?.devEUI?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'offline': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 60) return 'text-green-500';
    if (battery > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSignalBars = (signal) => {
    if (signal > -70) return 4;
    if (signal > -80) return 3;
    if (signal > -90) return 2;
    return 1;
  };

  // Generate payload for commands
  const generatePayload = () => {
    if (commandType === 'custom') return customPayload;

    let payload = commandTemplates[commandType]?.payload || '';

    // Replace parameters in payload
    Object.entries(selectedParams).forEach(([key, value]) => {
      if (key === 'interval') {
        payload = payload.replace(`{${key}}`, value);
      } else if (key === 'factor') {
        const hexValue = Math.round(parseFloat(value) * 100).toString(16).padStart(4, '0').toUpperCase();
        payload = payload.replace(`{${key}}`, hexValue);
      } else if (key === 'threshold') {
        const hexValue = parseInt(value).toString(16).padStart(4, '0').toUpperCase();
        payload = payload.replace(`{${key}}`, hexValue);
      }
    });

    return payload;
  };

  // Handle sending command
  // const handleSendCommand = async () => {
  //   if (!selectedMeter || !commandType) return;

  //   setSending(true);
  //   console.log("selected meter--------->", selectedMeter);

  //   const payload = {
  //     id: selectedMeter._id,
  //     commandType: commandTemplates[commandType]?.name,
  //     value: "",
  //     "slaveId": "03",
  //   }

  //   dispatch(sendDownlinlkCommand({ payload, port }));


  //   if (sendDownlinlkCommand.fulfilled) {
  //     setSending(false);
  //     dispatch(addActionHistoryToMeter());//this is the reducer to save the history to the meter.
  //     toast.success(`Command sent successfully to ${selectedMeter.name}`);
  //   } else {
  //     error("Error sending command");
  //   }
  // };
  const handleSendCommand = async () => {
    if (!selectedMeter || !commandType) return;

    setSending(true);
    console.log("selected meter--------->", selectedMeter);

    const payload = {
      id: selectedMeter._id,
      commandType: commandTemplates[commandType]?.name,
      value: Object.values(selectedParams)[0],
      slaveId: selectedMeter.slaveId.toString(),
    };

    try {
      // Dispatch the command and wait for response
      const result = await dispatch(sendDownlinlkCommand({ payload, port })).unwrap();

      // Create local history entry for immediate UI update
      const localHistoryEntry = {
        action: `Command: ${commandTemplates[commandType]?.name}`,
        timestamp: new Date(),
        status: 'sent'
      };

      // Add to local command history state for the command history panel
      setCommandHistory(prev => [{
        id: Date.now().toString(),
        commandType: commandTemplates[commandType]?.name,
        meterName: selectedMeter.name,
        devEUI: selectedMeter.deviceId,
        payload: generatePayload(),
        port: port,
        confirmed: confirmed,
        timestamp: new Date().toISOString(),
        status: 'sent'
      }, ...prev]);

      // Reset form
      setCommandType('');
      setSelectedParams({});
      setCustomPayload('');

      setSending(false);
      toast.success(`Command sent successfully to ${selectedMeter.name}`);

    } catch (error) {
      console.error("Error sending command:", error);

      // Add failed command to local history
      setCommandHistory(prev => [{
        id: Date.now().toString(),
        commandType: commandTemplates[commandType]?.name,
        meterName: selectedMeter.name,
        devEUI: selectedMeter.deviceId,
        payload: generatePayload(),
        port: port,
        confirmed: confirmed,
        timestamp: new Date().toISOString(),
        status: 'failed',
        error: error.message
      }, ...prev]);

      setSending(false);
      toast.error("Error sending command");
    }
  };

  // Handle parameter changes
  const handleParamChange = (paramName, value) => {
    setSelectedParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Handle adding a new meter field
  const handleAddMeterField = () => {
    setNewMeters([...newMeters, { meterId: '', rs485Id: '' }]);
  };

  // Handle removing a meter field
  const handleRemoveMeterField = (index) => {
    if (newMeters.length <= 1) return;
    const updatedMeters = [...newMeters];
    updatedMeters.splice(index, 1);
    setNewMeters(updatedMeters);
  };

  // Handle meter field changes
  const handleMeterFieldChange = (index, field, value) => {
    const updatedMeters = [...newMeters];
    updatedMeters[index][field] = value;
    setNewMeters(updatedMeters);
  };

  // Handle adding new meters
  const handleAddNewMeters = () => {
    if (!selectedUser) {
      alert('Please select a user');
      return;
    }

    const user = users.find(u => u.id === selectedUser);
    if (!user) return;

    // Create new meters
    const newMeterObjects = newMeters.map((meter, index) => {
      const meterId = `MTR${(meters.length + index + 1).toString().padStart(3, '0')}`;
      return {
        id: meterId,
        devEUI: `70B3D57ED0000${(meters.length + index + 1).toString().padStart(4, '0')}`,
        name: `${user.name}'s Meter ${index + 1}`,
        status: 'online',
        lastSeen: new Date().toISOString(),
        battery: Math.floor(Math.random() * 80) + 20,
        signal: -Math.floor(Math.random() * 40) - 50,
        type: ['Smart Water Meter', 'Smart Gas Meter', 'Smart Electric Meter'][Math.floor(Math.random() * 3)],
        userId: selectedUser,
        rs485Id: meter.rs485Id || `RS485-${(meters.length + index + 1).toString().padStart(3, '0')}`
      };
    });

    // Add to meters list
    setMeters([...meters, ...newMeterObjects]);//here we will dispatch the meter.

    // Reset form and close modal
    setNewMeters([{ meterId: '', rs485Id: '' }]);
    setSelectedUser('');
    setShowAddMeterModal(false);

    alert(`Successfully added ${newMeterObjects.length} new meters!`);
  };
  console.log("all meters data", { iot: unasignedIOTMeter, metering: meteringMeter });
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meter Management</h1>
            <p className="text-gray-600">Send commands to your smart meters via downlink</p>
          </div>
          <button
            onClick={() => setShowAddMeterModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Meter
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meter Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-3">Select Meter</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search meters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="max-h-82 overflow-y-scroll">
                {filteredMeters.map((meter) => (
                  <div
                    key={meter.meterId}
                    onClick={() => setSelectedMeter(meter)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedMeter?.meterId === meter.meterId ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-900">{meter.name}</div>
                      <div className={`flex items-center ${getStatusColor(meter.status)}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${meter.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {meter.status}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                      <div>ID: {meter.meterId}</div>
                      <div>DevEUI: {meter.meterSerialNumber}</div>
                      <div>RS485: {meter.slaveId}</div>
                      <div>{meter.type}</div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Battery className={`h-3 w-3 mr-1 ${getBatteryColor(meter.battery)}`} />
                        {meter.battery}%
                      </div>
                      <div className="flex items-center">
                        <Wifi className="h-3 w-3 mr-1" />
                        {Array.from({ length: 4 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-2 mr-0.5 ${i < getSignalBars(meter.signal) ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(meter.lastSeen).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Command Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Command Configuration</h2>

                {selectedMeter ? (
                  <div className="space-y-6">
                    {/* Selected Meter Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-blue-900">{selectedMeter.name}</h3>
                          <p className="text-xs text-blue-700">DevEUI: {selectedMeter.devEUI}</p>
                          <p className="text-xs text-blue-700">RS485 ID: {selectedMeter.rs485Id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Command Type Selection */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">Command Type</label>
                      <select
                        value={commandType}
                        onChange={(e) => {
                          setCommandType(e.target.value);
                          setSelectedParams({});
                          setCustomPayload('');
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a command...</option>
                        {Object.entries(commandTemplates).map(([key, template]) => (
                          <option key={key} value={key}>{template.name}</option>
                        ))}
                      </select>
                      {commandType && (
                        <p className="mt-2 text-xs text-gray-600">{commandTemplates[commandType].description}</p>
                      )}
                    </div>

                    {/* Command Parameters */}
                    {commandType && commandTemplates[commandType].params.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-700">Parameters</h4>
                        {commandTemplates[commandType].params.map((param) => (
                          <div key={param.name}>
                            <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                              {param.name.replace('_', ' ')}
                            </label>
                            {param.type === 'select' ? (
                              <select
                                value={selectedParams[param.name] || ''}
                                onChange={(e) => handleParamChange(param.name, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="">Select {param.name}...</option>
                                {param.options.map((option) => (
                                  <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={param.type}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                value={selectedParams[param.name] || param.default || ''}
                                onChange={(e) => handleParamChange(param.name, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Custom Payload
                    {commandType === 'custom' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Custom Hex Payload</label>
                        <input
                          type="text"
                          value={customPayload}
                          onChange={(e) => setCustomPayload(e.target.value.toUpperCase())}
                          placeholder="Enter hex payload (e.g., 010203FF)"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                        />
                      </div>
                    )} */}

                    {/* Port and Confirmation Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">Port</label>
                        <input
                          type="number"
                          min="1"
                          max="255"
                          value={port}
                          onChange={(e) => setPort(parseInt(e.target.value))}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="confirmed"
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confirmed" className="ml-2 text-xs text-gray-700">
                          Require confirmation (ACK)
                        </label>
                      </div>
                    </div>

                    {/* Payload Preview */}
                    {/* {commandType && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-700 mb-2">Payload Preview</h4>
                        <div className="font-mono text-xs bg-white p-3 rounded border">
                          {generatePayload() || 'No payload generated'}
                        </div>
                      </div>
                    )} */}

                    {/* Send Button */}
                    <button
                      onClick={handleSendCommand}
                      disabled={!commandType || sending || selectedMeter?.status === 'offline'}
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {sending ? (
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5 mr-2" />
                      )}
                      {sending ? 'Sending...' : 'Send Command'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a meter to configure commands</p>
                  </div>
                )}
              </div>
            </div>

            {/* Command History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96">
              <div className="p-6 pb-2">
                <h2 className="font-semibold text-gray-900 mb-4">Command History</h2>

                {commandHistory.length > 0 ? (
                  <div className="space-y-4 max-h-76 overflow-y-scroll px-2 pb-2">
                    {[...commandHistory].reverse().slice(0, 10).map((cmd,idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {cmd.status === 'success' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : cmd.status === 'failed' ? (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                            )}
                            <span className="font-medium">{cmd.action}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(cmd.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>Meter: {selectedMeter.name}</div>
                          <div>MeterId: {selectedMeter.meterId}</div>
                          <div>DevEUI: {selectedMeter.deviceId}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No commands sent yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meter Modal */}
      {showAddMeterModal && (
        <AddMeterModal
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          filteredUsers={filteredUsers}
          newMeters={newMeters}
          handleMeterFieldChange={handleMeterFieldChange}
          handleAddMeterField={handleAddMeterField}
          handleRemoveMeterField={handleRemoveMeterField}
          handleAddNewMeters={handleAddNewMeters}
          setShowAddMeterModal={setShowAddMeterModal} />
      )}
    </div>
  );
};

export default MeterManagement;
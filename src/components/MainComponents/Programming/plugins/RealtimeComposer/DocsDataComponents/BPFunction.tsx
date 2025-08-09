import { UnrealEngineTypes } from "./DocsConstants";
import React from "react";

/* example docs section
<section id="core-control-api" className="docs-section">
    <h3>Core RealtimeComposer Control API</h3>
    <div>
    This is the core API for control playing of the music system, audio tracks, music-collections and sub-collections, as well as state switching.
    <br/>
    These are the most high level functions that define the most essential behavior functionality control.
    </div>

    <div style={{ marginBottom: '2rem' }}>
        <BPFunction functionData={{
            name: "{function_name}",
            description: "{function_description}",
            parameters: [
                // { name: "{parameter_name}", type: "{parameter_type}", description: "{parameter_description}" } // if any parameters
            ],
            return: {
                type: "return_type",
                description: "return_description"
            }
        }} />
    </div>
</section>
*/

interface FunctionParameters {
    name: string;
    type: string;
    description: string;
}

interface FunctionReturn {
    type: string;
    description: string;
}

interface FunctionData {
    name: string;
    description: string;
    parameters: FunctionParameters[];
    return: FunctionReturn;
}

interface BPFunctionProps {
    functionData: FunctionData;
    className?: string;
}

const exampleFunction1 : FunctionData = {
    name: "CreateMusicState",
    description: "Creates a new music state with the specified name and tempo",
    parameters: [
        { name: "StateName", type: "FName", description: "Name of the music state to create" },
        { name: "Tempo", type: "float", description: "Tempo in BPM for this music state" },
        { name: "TimeSignature", type: "int32", description: "Time signature (e.g., 4 for 4/4 time)" }
    ],
    return: {
        type: "URC_MusicState*",
        description: "Reference to the created music state"
    }
}

const exampleFunction2 : FunctionData = {
    name: "EscalateSubState",
    description: "Escalates a sub-state by the specified factor",
    parameters: [
        { name: "SubState", type: "URC_SubState*", description: "Sub-state to escalate" },
        { name: "Factor", type: "int32", description: "Escalation factor" }
    ],
    return: {
        type: "void",
        description: ""
    }
}

const exampleFunction3 : FunctionData = {
    name: "SetMusicType",
    description: "Sets the music type using an enum parameter",
    parameters: [
        { name: "MusicType", type: "enum", description: "Type of music to set" },
        { name: "Volume", type: "float", description: "Volume level" }
    ],
    return: {
        type: "bool",
        description: "Success status"
    }
}

// BP Function component
const BPFunction: React.FC<BPFunctionProps> = ({ functionData, className = "" }) => {
    const getTypeColor = (type: string) => {
        // Handle pointer types
        if (type.includes('*')) {
            const baseType = type.replace('*', '');
            // Check if it's a UObject type (starts with U)
            if (baseType.startsWith('U')) {
                return UnrealEngineTypes.UObject;
            }
            return UnrealEngineTypes[baseType as keyof typeof UnrealEngineTypes] || UnrealEngineTypes.UObject;
        }
        
        // Handle UObject types (starts with U)
        if (type.startsWith('U')) {
            return UnrealEngineTypes.UObject;
        }
        
        // Handle enum types (check if it's exactly "enum" or starts with "enum")
        if (type.startsWith("E")|| type.toLowerCase() === 'enum' || type.toLowerCase().startsWith('enum')) {
            return UnrealEngineTypes.enum;
        }
        
        return UnrealEngineTypes[type as keyof typeof UnrealEngineTypes] || UnrealEngineTypes.UObject;
    };

    const formatTypeName = (type: string) => {
        // Handle pointer types
        if (type.includes('*')) {
            return type;
        }
        
        // Handle UObject types
        if (type.startsWith('URC_')) {
            return type;
        }
        
        return type;
    };

    return (
        <div style={{ padding: '2rem', background: '#1a1a1a' }}>
            <h2 style={{ color: 'rgb(255, 196, 0)', marginBottom: '2rem' }}>
                {functionData.name}
                <span style={{ color: 'rgb(255, 196, 0)', marginLeft: "6px" }}>(</span>
                {functionData.parameters.map((param, index) => (
                    <React.Fragment key={index}>
                        {/* <span style={{ color: getTypeColor(param.type) }}>{param.type}</span> */}
                        <span style={{ color: 'rgb(94, 6, 246)', fontSize: '1.2rem' }}>{param.type}</span>
                        <span style={{ color: 'grey', fontSize: '1.6rem' }}> {param.name}</span>
                        {index < functionData.parameters.length - 1 && <span style={{ color: 'white' }}>, </span>}
                    </React.Fragment>
                ))}
                <span style={{ color: 'rgb(255, 196, 0)', marginRight: "6px" }}>)</span>
            </h2>
            <div className="s2 m2 font-1">
                {functionData.description}
            </div>
            {functionData.return.type !== "void" && (<div>
                <div className="s2 m2 font-1">
                    <span style={{ color: 'rgb(94, 6, 246)' }}>Returns:</span> {functionData.return.description}
                </div>
            </div>)}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className={`bp-function-node ${className}`}>
            {/* Node Header */}
            <div className="bp-node-header">
                <div className="bp-node-title">
                    <span className="bp-function-icon">f</span>
                    <span className="bp-function-name">{functionData.name}</span>
                </div>
                <div className="bp-node-category">Static</div>
            </div>
            
            {/* Node Body */}
            <div className="bp-node-body">
                <div className="bp-pins-container">
                    {/* Input Pins */}
                    <div className="bp-input-pins">
                        {functionData.parameters.map((param, index) => (
                            <div key={index} className="bp-pin bp-input-pin" data-type={param.type}>
                                <div className="bp-pin-connector bp-input-connector"></div>
                                <div className="bp-pin-content">
                                    <div className="bp-pin-name">{param.name}</div>
                                    <div 
                                        className="bp-pin-type"
                                        style={{ color: getTypeColor(param.type) }}
                                    >
                                        {formatTypeName(param.type)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Output Pin */}
                    {functionData.return.type !== "void" && (
                        <div className="bp-output-pins">
                            <div className="bp-pin bp-output-pin" data-type={functionData.return.type}>
                                <div className="bp-pin-content">
                                    <div className="bp-pin-name">Return Value</div>
                                    <div 
                                        className="bp-pin-type"
                                        style={{ color: getTypeColor(functionData.return.type) }}
                                    >
                                        {formatTypeName(functionData.return.type)}
                                    </div>
                                </div>
                                <div className="bp-pin-connector bp-output-connector"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
            </div>
        </div>
    );
};

// Default export with example usage
export default function BPFunctionExample() {
    return (
        <div style={{ padding: '2rem', background: '#1a1a1a', minHeight: '100vh' }}>
            <h2 style={{ color: 'white', marginBottom: '2rem' }}>Realtime Composer - Blueprint Function Examples</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                These are examples of how the Blueprint function nodes look in the Unreal Engine editor for the Realtime Composer plugin.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <BPFunction functionData={exampleFunction1} />
                <BPFunction functionData={exampleFunction2} />
                <BPFunction functionData={exampleFunction3} />
            </div>
        </div>
    );
}

// Export the component for use in other files
export { BPFunction };


UCLASS(BlueprintType)
class REALTIMECOMPOSER_API URealtimeComposerManagerInterface : public UObject
{
	GENERATED_BODY()
public:

	/// SECTION 1 | Core RealtimeComposer control API -----------------------------------------------------------------------------------------------------------------
	/*
		This is the core API for control playing of the music system, audio tracks, music-collections and sub-collections, as well as state switching.
		These are the most high level functions that define the most essential behavior functionality control.
	*/

	/// <summary>
	/// Start play the music system
	/// </summary>
	/// <param name="bPlayWithMetronome">Should the metronome be playing as well</param>
	/// <param name="PrecountBounds">How much musical time to play before actually hitting Bar 1 Beat 1 (ignored if resuming after pause). Can choose None to opt-out.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void PlayMusicSystem(bool bPlayWithMetronome = true, ERCPrecountBounds PrecountBounds = ERCPrecountBounds::Bar);

	/// <summary>
	/// Pause the music system. To resume playing, call `PlayMusicSystem` again
	/// </summary>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void PauseMusicSystem();

	/// <summary>
	/// Stop play of the music system
	/// </summary>
	/// <param name="StopBehavior">How should the playing music be stopped</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void StopMusicSystem(ERCTrackRemovalBehavior StopBehavior);

	/// <summary>
	/// Escalate the currently playing MusicalState.
	/// If a MusicalState has X number of groups under it (referred to as `EscalationFactors` or `SubStates`), then each factor escalated will start playing the tracks under it
	/// </summary>
	/// <param name="PlayOnNextQuantization">The next musical time when the escalation should start</param>
	/// <param name="Factor">The degree of escalation. NOTE1: MusicalState should have sufficient sub-states for the request (truncated otherwise). NOTE2: Factor value can not be lower than 1</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void MusicEscalate(EQuartzCommandQuantization PlayOnNextQuantization = EQuartzCommandQuantization::Bar, int32 Factor = 1);

	/// <summary>
	/// De-escalate a currently playing MusicalState.
	/// </summary>
	/// <param name="TrackDeescalationBehavior">The behavior or timing of how should the associated audio tracks should stop playing</param>
	/// <param name="Factor">The degree of deescalation. NOTE1: MusicalState should have sufficient sub-states for the request (truncated otherwise). NOTE2: Factor value can not be lower than 1</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void MusicDeescalate(ERCTrackRemovalBehavior TrackDeescalationBehavior = ERCTrackRemovalBehavior::StopNextBar, int32 Factor = 1);

	/// <summary>
	/// Switch to a new musical state
	/// </summary>
	/// <param name="NewStateName">The name of the MusicalState to activate</param>
	/// <param name="SwitchQuantization"></param>
	/// <param name="bAutoEscalate">Should automatically escalate and play upon switch</param>
	/// <param name="Factor">The degree of escalation to use (used only if passing `bAutoEscalate = true`)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SwitchMusicalState(FName NewStateName, EQuartzCommandQuantization SwitchQuantization = EQuartzCommandQuantization::Bar, bool bAutoEscalate = true, int32 Factor = 1);

	
	/// <summary>
	/// Standardized function that can play any (already Loaded) AudioTrack (except for MusicCollection tracks which only respond to `MusicEscalate()`)
	/// </summary>
	/// <param name="Track">The track to play</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void PlayRCTrack(URCAudioTrackBase* Track);

	
	/// <summary>
	/// Standardized function that can stop any playing AudioTrack (except for MusicCollection tracks which only respond to `MusicDeescalate()`)
	/// </summary>
	/// <param name="Track">The track to play</param>
	/// Still need to think if MusicTracks should be included here or not
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void StopRCTrack(URCAudioTrackBase* Track, ERCTrackRemovalBehavior StopBehavior);

	/// <summary>
	/// Set the audio track's volume, normalized
	/// </summary>
	/// <param name="Channel">The audio channel to update</param>
	/// <param name="InVolume">The new gain value from 0.0 to 1.0</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetAudioChannelVolume(URCAudioChannelBase* Channel, float InVolume);

	/// <summary>
	/// Sets the volume level for the specified audio track.
	/// </summary>
	/// <param name="Track">A pointer to the audio track whose volume will be set.</param>
	/// <param name="InVolume">The new volume level to apply to the audio track.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetAudioTrackVolume(URCAudioTrackBase* Track, float InVolume);

	/// <summary>
	/// Modulates the volume of a specified audio channel over a given duration.
	/// </summary>
	/// <param name="Channel">Pointer to the audio channel whose volume will be modulated.</param>
	/// <param name="TargetVolume">The target volume to reach, in the range [0.0, 1.0].</param>
	/// <param name="LerpDuration">The duration, in seconds, over which to interpolate the volume change.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ModulateAudioChannelVolume(URCAudioChannelBase* Channel, float TargetVolume, float LerpDuration);

	/// <summary>
	/// Modulates the volume of an audio track over a specified duration.
	/// </summary>
	/// <param name="Track">Pointer to the audio track whose volume will be modulated.</param>
	/// <param name="TargetVolume">The target volume to reach, in the range [0.0, 1.0].</param>
	/// <param name="LerpDuration">The duration, in seconds, over which to interpolate the volume change.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ModulateAudioTrackVolume(URCAudioTrackBase* Track, float TargetVolume, float LerpDuration);

	/// <summary>
	/// Function used for start playing all tracks under a sub-collection group
	/// </summary>
	/// <param name="MusicState">The owning music state</param>
	/// <param name="GroupName">The group name</param>
	/// <param name="SubContext">Sub Collection context (MusicTracks SubCol ops are forbidden and ignored)</param>
	/// <param name="Q">The Quantization type to play group  (use EQuartzCommandQuantization::None to use Track Default set quantization on track creation)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetSubcollectionGroupPlayActive(UMusicStateCollections* MusicState, FName GroupName, EAudioTrackGroupContext SubContext, EQuartzCommandQuantization Q = EQuartzCommandQuantization::None);

	/// <summary>
	/// Function used for stopping all tracks under a sub-collection group
	/// </summary>
	/// <param name="MusicState">The owning music state</param>
	/// <param name="GroupName">The group name</param>
	/// <param name="SubContext">Sub Collection context (MusicTracks SubCol ops are forbidden and ignored)</param>
	/// <param name="Q">The stop behavior (dequeue, next bar, next beat)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetSubcollectionGroupPlayDisabled(UMusicStateCollections* MusicState, FName GroupName, EAudioTrackGroupContext SubContext, ERCTrackRemovalBehavior RemovalBehavior);

	/// <summary>
	/// Set music system clock to play with metronome or not
	/// </summary>
	/// <param name="bActive">If true, metronome will play while music clock ticks</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetMetronomeActive(bool bActive);

	/// SECTION 2 | Core Musical State hierarchy management -----------------------------------------------------------------------------------------------------------------------
	/*
		The following API provides the heavily relied-upon functions for creating MusicalStates, SubStates, and AudioTracks - which serve as the core building blocks of the Realtime Composer system.
		A MusicalState is is a core RC object that establishes a musical hierarchy bound by a fixed Tempo and time signature. It provides an AudioChannel that's linked to a MusicCollection, and other 3 SubCollections (AudioCollection, TransientsCollection, SamplesCollection) that all belong under the MusicalState.
		A MusicCollection is built of `SubStates/EscalationFactors`, which are also simply AudioChannels that go under the main MusicalState channel (use the `MusicEscalate()` function to play `SubStates/EscalationFactors`)
		A `SubState/EscalationFactor` ia an audio channel that contains actual AudioTracks (wave sound sources to be played), each SubState is essentially an AudioChannel to which all tracks under it output their audio to
	*/
	

	/// <summary>
	/// Creates a new MusicalState
	/// </summary>
	/// <param name="NewCollectionName">The name for the new MusicalState collection</param>
	/// <param name="TempoSettings">The Tempo settings to create the music state with</param>
	/// <returns>The newly created AudioChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* AddNewMusicalState(FName NewCollectionName, FStateTempoSettings TempoSettings = FStateTempoSettings());

	/// <summary>
	/// Creates a new SubState/EscalationFactor under a MusicalState
	/// </summary>
	/// <param name="CollectionName">The name of the owning MusicalState collection</param>
	/// <param name="NewSubstateName">The name for the new SubStateEscalationFactor group</param>
	/// <returns>The newly created AudioChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* AddNewSubstate(FName CollectionName, FName NewSubstateName);


	/// <summary>
	/// Creates a new AudioTrack under a `MusicalState->EscalationFactor`
	/// </summary>
	/// <param name="CollectionName">The name of the owning MusicalState collection</param>
	/// <param name="SubstateName">The name of the owning SubStateEscalationFactor group</param>
	/// <param name="Track">The representation object for the Track</param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* AddNewTrack(FName CollectionName, FName SubstateName, URCTrackRepresentation* Track);

	/// <summary>
	/// Fully removes a MusicalState from audio hierarchy
	/// </summary>
	/// <param name="CollectionName">The name of the MusicalState collection to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the state is currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveMusicalState(FName CollectionName, ERCTrackRemovalBehavior RemovalBehavior);

	/// <summary>
	/// Fully removes a SubState from a state's audio hierarchy
	/// </summary>
	/// <param name="CollectionName">The name of the MusicalState collection to remove</param>
	/// <param name="SubstateName">The name of the EscalationFactor group collection to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the sub-state is currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveSubstate(FName CollectionName, FName SubstateName, ERCTrackRemovalBehavior RemovalBehavior);

	/// <summary>
	/// Fully removes a Track from a sub-state's audio hierarchy
	/// </summary>
	/// <param name="CollectionName">The name of the MusicalState collection to remove</param>
	/// <param name="SubstateName">The name of the EscalationFactor group collection to remove</param>
	/// <param name="TrackName">The name of track to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the track is currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveTrack(FName CollectionName, FName SubstateName, FName TrackName, ERCTrackRemovalBehavior RemovalBehavior);


	/// SECTION 3 | SubCollections API ---------------------------------------------------------------------------------------------------------------------------------
	/*
		The term `SubCollections` in RealtimeComposer refers to the additional 3 sub-hierarchies that exist under a MusicalState, for `AudioCollection`, `TransientCollection`, and `SampleCollection`.

		These sub-hierarchies allow for specific functionality and behavior, and the best way to understand them is by first understanding the core MusicCollection of the MusicalState:
		- The `MusicCollection` is an audio channel holding SubStatesEscalationFactors (i.e, specialized audio channels), and each SubState channel can play a group of AudioTrack sound sources under it
			+ Can be controlled only by the `MusicEscalate()` and `MusicDeescalate()` functions (esclations and deescalations happening linearly, i.e up or down, no skipping of substates)
		- The `AudioCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are meant to be looping like MusicCollection tracks, but without the `MusicEscalate()` and `MusicDeescalate()` "limitation" - you can play any channel group or individual track on demend
			+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
		- The `TransientCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are meant to be "fire and forget" play behavior - no looping. This is ideal for syncing musical reactions to a gameplay driven event, timed perfectly on the desired musical time
			+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
		- The `SampleCollection` is an audio channel holding SubCollectionGroups (i.e, other specialized audio channels), and each sub-group channel can play group of AudioTrack sound sources under it that are played as an arpeggiator. You decide what is the Q for the AudioTrack, and it will play on that Q for as long as the arpeggiator/group/track is active.
			+ Can be controlled via `SetSubCollectionGroupPlayActive()` and `SetSubCollectionGroupPlayDisabled()` to play or stop whole groups, and can use `PlayRCTrack()` `StopRCTrack()` to play and stop individual tracks
	*/

	/// <summary>
	/// Adds a new group to a SubCollection of the desired context
	/// </summary>
	/// <param name="CollectionName">The owning collection name (MusicalState name)</param>
	/// <param name="SubCollectionContext">The desired sub-collection context (supports all SubCollection types, including MusicTracks (simply adds a new SubState))</param>
	/// <param name="NewSubCollectionGroupName">The new group name to create</param>
	/// <returns>The newly created AudioChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* AddNewSubCollectionGroup(FName CollectionName, EAudioTrackGroupContext SubCollectionContext, FName NewSubCollectionGroupName);

	/// <summary>
	/// Adds a track to a SubCollection group of the desired context
	/// </summary>
	/// <param name="CollectionName">The owning collection name (MusicalState name)</param>
	/// <param name="SubCollectionContext">The desired sub-collection context (supports all SubCollection types)</param>
	/// <param name="SubCollectionGroupName">The new group name to create</param>
	/// <param name="Track">The representation object of the new track to create</param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* AddNewTrackToSubCollectionGroup(FName CollectionName, EAudioTrackGroupContext SubCollectionContext, FName SubCollectionGroupName, URCTrackRepresentation* Track);

	/// <summary>
	/// Creates an RC-MIDI music track and adds it to the `MusicState[SubCollectionContext]->GroupName`. NOTE1: To create the MIDI track representation, call CreateMusicTrack.
	/// Uses "AddNewTrackToSubCollectionGroup" internally. NOTE2: Can be used for MusicCollection tracks as well (not just subcollections)
	/// </summary>
	/// <param name="MusicalStateName"></param>
	/// <param name="Context"></param>
	/// <param name="GroupName"></param>
	/// <param name="Track"></param>
	/// <param name="Quantization"></param>
	/// <param name="SoundPreset">An optional MetaSound asset that defines the synth sound. If left empty, will use RC default sound. NOTE: If you do provide a custom MetaSound asset, then it must conform to the having these 3 float input parameters (Pitch, Duration, Volume) that need to be set up in a meaningful way (read more in docs about MIDI tracks in Realtime Composer)</param>
	/// <returns>The newly created MusicTrack (RC-MIDI track object)</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCMusicTrack* AddMIDIMusicTrack(FName MusicalStateName, EAudioTrackGroupContext Context, FName GroupName, URCMusicTrackRepresentation* Track, EQuartzCommandQuantization Quantization = EQuartzCommandQuantization::Bar, UMetaSoundSource* SoundPreset = nullptr
	);

	/// <summary>
	/// Fully removes SubCollection group of the desired context
	/// </summary>
	/// <param name="CollectionName">The owning collection name (MusicalState name)</param>
	/// <param name="NewSubCollectionGroupName">The new group name to create</param>
	/// <param name="SubCollectionContext">The desired sub-collection context (supports all SubCollection types)</param>
	/// <param name="Track">The representation object of the new track to create</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveSubCollectionGroup(
		FName CollectionName,
		FName SubCollectionGroupName,
		EAudioTrackGroupContext SubCollectionContext,
		ERCTrackRemovalBehavior RemovalBehavior);

	/*UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void Remove*/

	/// <summary>
	/// Fully removes an audio Track under a SubCollection group of the desired context
	/// </summary>
	/// <param name="CollectionName">The owning collection name (MusicalState name)</param>
	/// <param name="SubCollectionContext">The desired sub-collection context (supports all SubCollection types)</param>
	/// <param name="SubCollectionGroupName">The subcollection group name where the track exists</param>
	/// <param name="TrackName">The name of the Track to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the track is currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveTrackFromSubCollectionGroup(
		FName CollectionName,
		EAudioTrackGroupContext SubCollectionContext,
		FName SubCollectionGroupName,
		FName TrackName,
		ERCTrackRemovalBehavior RemovalBehavior
	);


	/// <summary>
	/// Fully remove any non-persistent audio channel. If the audio channel is not under a MusicStateCollection (like GameAudio mix group channels), then the you should pass nullptr as the `MusicStateCollection` parameter
	/// </summary>
	/// <param name="MusicStateCollection">The owning AudioChannel the AudioChannel belongs to (nullptr if not a Music-derived audio channel)</param>
	/// <param name="AudioChannel">The channel to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the channel's tracks are currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveRCAudioChannel(UMusicStateCollections* MusicStateCollection, URCAudioChannelBase* AudioChannel, ERCTrackRemovalBehavior RemovalBehavior);

	/// <summary>
	/// Creates a new AudioTrack representation (then you should use `AddNewTrackToSubCollectionGroup` to create the actual track and add it to the hierarchy)
	/// </summary>
	/// <param name="TrackName">The name for the new track</param>
	/// <param name="AudioFile">The track's audio wav file</param>
	/// <returns>The newly created AudioTrack representation</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackRepresentation* CreateAudioTrack(FName TrackName, USoundBase* AudioFile)
	{
		URCAudioTrackRepresentation* NewAudioTrack = NewObject<URCAudioTrackRepresentation>();

		NewAudioTrack->TrackName = TrackName;
		NewAudioTrack->AudioFile = AudioFile;

		return NewAudioTrack;
	}

	/// <summary>
	/// Creates a new MIDITrack representation (then you should use `AddNewTrackToSubCollectionGroup` to create the actual track and add it to the hierarchy)
	/// </summary>
	/// <param name="TrackName">The name for the new track</param>
	/// <param name="MusicalSequence">The musical sequence data</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCMusicTrackRepresentation* CreateMusicTrack(FName TrackName, const FRCNoteSequence& MusicalSequence)
	{
		URCMusicTrackRepresentation* NewMusicTrack = NewObject<URCMusicTrackRepresentation>();

		NewMusicTrack->TrackName = TrackName;
		NewMusicTrack->MusicianName = MusicianName;
		NewMusicTrack->MusicalSequence = MusicalSequence;

		return NewMusicTrack;
	}

	/// SECTION 4 | Game Audio API --------------------------------------------------------------------------------------------------------------------------------------------
	/*
		The Game Audio API is establishing the same AudioChannel DSP control over your entire game audio, 2D and 3D all the same.
		A top-level GameAudio AudioChannel is called a MixGroup. These should be used to define broad categories (such as `UI`, `Dialogue`, `PlayerSounds`, etc...).
		Then any sub-level GameAudio AudioChannel is called a Sub-MixGroup (can be recursive). These can be used to specify intricate channels under your broad top-level categories.

		When you want to create either a 2D or 3D game audi track, you can use the "Import" functions to create and load the tracks, ot use the "Spawn" functions to create and immediately play the track (if using "Import", can then simply play and stop tracks with the standard `PlayRCTrack()` and `StopRCTrack()` functions).
	*/

	/// <summary>
	/// Adds a new top-level GameAudio mix group audio channel. This audio channel is used for grouping game 2D and 3D sounds alike
	/// </summary>
	/// <param name="NewMixGroupName">New channel name</param>
	/// <param name="bIs3DSound | DEPRECATED">DEPRECATED</param>
	/// <returns>The newly created AudioChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelData* AddNewGameAudioMixGroup(FName NewMixGroupName, bool bIs3DSound);

	/// <summary>
	/// Adds a new sub-GameAudio mix group audio channel. This can be used to add a new mix group under a top-level or a sub-level mix group channel.
	/// </summary>
	/// <param name="ParentGroup">The parent mix group channel to add new group under</param>
	/// <param name="NewSubmixGroupName">New group name</param>
	/// <param name="bIs3DSound | DEPRECATED">DEPRECATED</param>
	/// <returns>The newly created AudioChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelData* AddNewGameAudioSubMixGroup(URCAudioChannelData* ParentGroup, FName NewSubmixGroupName, bool bIs3DSound);

	/// <summary>
	/// Add a new track for a GameAudio mix group channel. Used for 2D tracks only.
	/// </summary>
	/// <param name="GroupAudioChannel">The channel to place the track under</param>
	/// <param name="TrackName">The new track name</param>
	/// <param name="bLooping">Set track to play looping</param>
	/// <param name="AudioFile">The audio file to play</param>
	/// <param name="bPersistentTrack"></param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* ImportGameAudioTrack2D(URCAudioChannelData* GroupAudioChannel, FName TrackName, bool bLooping, USoundBase* AudioFile, bool bPersistentTrack = false);

	/// <summary>
	/// Add a new track for a GameAudio mix group channel. Used for 3D tracks mainly.
	/// </summary>
	/// <param name="GroupAudioChannel">The channel to place the track under</param>
	/// <param name="TrackName">The new track name</param>
	/// <param name="bLooping">Set track to play looping</param>
	/// <param name="AudioFile">The audio file to play</param>
	/// <param name="Sound3dSettings">The 3D settings to apply on the track. can still be used for 2D tracks if `ERC3DSoundSource::None`</param>
	/// <param name="bPersistentTrack"></param>
	/// <returns>The newly created track</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* ImportGameAudioTrack3D(URCAudioChannelData* GroupAudioChannel, FName TrackName, USoundBase* AudioFile, bool bLooping, FRCSound3DSettings Sound3dSettings, bool bPersistentTrack = false);

	/// <summary>
	/// Fully remove a top-level GameAudio mix group channel
	/// </summary>
	/// <param name="MixGroupToRemove">Channel to remove</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveGameAudioMixGroup(URCAudioChannelData* MixGroupToRemove);

	/// <summary>
	/// Fully remove an audio track from a GameAudio mix group channel
	/// </summary>
	/// <param name="MixGroup">Channel to remove track from</param>
	/// <param name="TrackNameToRemove">Track name to remove</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveAudioTrackFromAudioMixGroup(URCAudioChannelData* MixGroup, FName TrackNameToRemove);


	
	/// <summary>
	/// Spawn a 3D sound, attached to an actor
	/// </summary>
	/// <param name="Context">The actor to attach to</param>
	/// <param name="TrackName">The new track name</param>
	/// <param name="AudioFile">The audio file source</param>
	/// <param name="bIsLooping">Should track play looping</param>
	/// <param name="Attenuation">The 3D attenuation settings to apply</param>
	/// <param name="OwningChannel">The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)</param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* SpawnRCSound3D_ActorAttached(AActor* Context, FName TrackName, USoundBase* AudioFile, bool bIsLooping, USoundAttenuation* Attenuation, URCAudioChannelData* OwningChannel = nullptr);

	/// <summary>
	/// Spawn a 3D sound, attached to a component
	/// </summary>
	/// <param name="Context">The component to attach to</param>
	/// <param name="TrackName">The new track name</param>
	/// <param name="AudioFile">The audio file source</param>
	/// <param name="bIsLooping">Should track play looping</param>
	/// <param name="Attenuation">The 3D attenuation settings to apply</param>
	/// <param name="OwningChannel">The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)</param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* SpawnRCSound3D_ComponentAttached(UObject* Context, FName TrackName, USoundBase* AudioFile, bool bIsLooping, USoundAttenuation* Attenuation, URCAudioChannelData* OwningChannel = nullptr);

	/// <summary>
	/// Spawn a 3D sound at world location
	/// </summary>
	/// <param name="Location">The world location to spawn the sound</param>
	/// <param name="TrackName">The new track name</param>
	/// <param name="AudioFile">The audio file source</param>
	/// <param name="bIsLooping">Should track play looping</param>
	/// <param name="Attenuation">The 3D attenuation settings to apply</param>
	/// <param name="OwningChannel">The GameAudio mix group channel to play the track under (if left NULL will use the root GameAudio channel)</param>
	/// <returns>The newly created AudioTrack</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* SpawnRCSound3D_AtLocation(FVector Location, FName TrackName, USoundBase* AudioFile, bool bIsLooping, USoundAttenuation* Attenuation, URCAudioChannelData* OwningChannel = nullptr);

	/// <summary>
	/// Fully remove an audio track
	/// </summary>
	/// <param name="AudioTrack">The track to remove</param>
	/// <param name="RemovalBehavior">The type of audio stop behavior to use (only applies if the track is currently actively playing)</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveRCAudioTrack(URCAudioTrackBase* AudioTrack, ERCTrackRemovalBehavior RemovalBehavior);

	/// SECTION 5 | Sound Effects API -------------------------------------------------------------------------------------------------------------------------------------------------

	/*
		The effects API allows for simple integration of effects processing on any audio channels, in realtime.
		This can be very powerful for both music and gameplay sound experiences.
		The RealtimeComposer system wraps around the native UE `SubmixSoundEffects`, providing a consistent API for easy control over effect parameters, as well as effect modulations over time.
	*/

	/// <summary>
	/// Adds a new audio effect to an audio channel
	/// </summary>
	/// <param name="Channel">The channel to add effect to</param>
	/// <param name="EffectToCreate">The effect type to create</param>
	/// <returns>The newly created RC-AudioEffect base controller (needs down-casting to the specific effect controller type if want to modify specific effect parameters)</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCSubmixEffectControllerBase* AddAudioEffectToAudioChannel(URCAudioChannelBase* Channel, ERCSubmixAudioEffectType EffectToCreate);

	/// <summary>
	/// Remove an audio effect from a channel
	/// </summary>
	/// <param name="Channel">The channel to remove effect from</param>
	/// <param name="EffectToRemove">The effect controller to remove</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveAudioEffectFromAudioChannel(URCAudioChannelBase* Channel, URCSubmixEffectControllerBase* EffectToRemove);

	/// <summary>
	/// Modify active state of an audio effect
	/// </summary>
	/// <param name="Channel">The channel the effect is under</param>
	/// <param name="Effect">The effect controller to modify</param>
	/// <param name="bEnable">Should enable or disable effect</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetEnableAudioChannelEffect(URCAudioChannelBase* Channel, URCSubmixEffectControllerBase* Effect, bool bEnable);

	/// <summary>
	/// Get the effects chain for an audio channel
	/// </summary>
	/// <param name="Channel">The channel to search under</param>
	/// <returns>An array of base effect controllers. Can use a controller's `ERCSubmixAudioEffectType EffectType` member to know which derived effect controller to actually cast to</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<URCSubmixEffectControllerBase*> GetAudioChannelEffects(URCAudioChannelBase* Channel);

	/// <summary>
	/// Get effect at the specified chain index. NOTE: Make sure the supplied index is within bounds of the fx chain array
	/// </summary>
	/// <param name="Channel">The channel to search under</param>
	/// <param name="EffectIndex">The index of the effect in the effects chain</param>
	/// <returns>The base effect controller. Can use the controller's `ERCSubmixAudioEffectType EffectType` member to know which derived effect controller to actually cast to</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCSubmixEffectControllerBase* GetAudioChannelEffectAtIndex(URCAudioChannelBase* Channel, int32 EffectIndex);

	
	/// <summary>
	/// Move and re-order an audio effect within the chain
	/// </summary>
	/// <param name="Channel">The channel to process</param>
	/// <param name="EffectIndex">The current index of the effect to be moved</param>
	/// <param name="Direction">The direction AND degree of how far to move the effect. Can also be negative numbers to move effect back on chain</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void MoveAudioChannelSoundEffectInChain(URCAudioChannelBase* Channel, int32 EffectIndex, int32 Direction = 1);

	/// <summary>
	/// Updates the value of a specific effect parameter on an audio channel
	/// </summary>
	/// <param name="Channel">Pointer to the audio channel whose effect parameter will be updated</param>
	/// <param name="Effect">Pointer to the effect controller associated with the audio channel</param>
	/// <param name="EffectParamName">The name of the effect parameter to update</param>
	/// <param name="TargetValue">The new value to set for the specified effect parameter</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void UpdateAudioChannelEffectParameter(URCAudioChannelBase* Channel, URCSubmixEffectControllerBase* Effect, FName EffectParamName, float TargetValue);

	/// <summary>
	/// Modulates a parameter of an audio channel's effect over a specified duration.
	/// </summary>
	/// <param name="Channel">Pointer to the audio channel whose effect parameter will be modulated.</param>
	/// <param name="Effect">Pointer to the submix effect controller containing the parameter to modulate.</param>
	/// <param name="EffectParamName">The name of the effect parameter to be modulated.</param>
	/// <param name="TargetValue">The target value to which the parameter will be interpolated.</param>
	/// <param name="LerpDuration">The duration, in seconds, over which the parameter will be interpolated to the target value.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ModulateAudioChannelEffectParameter(URCAudioChannelBase* Channel, URCSubmixEffectControllerBase* Effect, FName EffectParamName, float TargetValue, float LerpDuration);

	/// <summary>
	/// Retrieves the names of all effect parameters for a given audio channel effect
	/// </summary>
	/// <param name="Effect">A pointer to the submix effect controller from which to retrieve parameter names</param>
	/// <returns>An array of FName objects representing the names of the effect parameters</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<FName> GetAudioChannelEffectParameterNames(URCSubmixEffectControllerBase* Effect);

	/// <summary>
	/// Updates the value of a specified effect parameter on an audio track.
	/// </summary>
	/// <param name="Track">Pointer to the audio track whose effect parameter will be updated.</param>
	/// <param name="ParamName">The name of the effect parameter to update.</param>
	/// <param name="TargetValue">The new value to set for the effect parameter.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void UpdateAudioTrackEffectParameter(URCAudioTrackBase* Track, FName ParamName, float TargetValue);

	/// <summary>
	/// Modulates a parameter of an audio track effect over a specified duration
	/// </summary>
	/// <param name="Track">The audio track whose effect parameter will be modulated</param>
	/// <param name="ParamName">The name of the parameter to modulate</param>
	/// <param name="TargetValue">The target value to which the parameter will be interpolated</param>
	/// <param name="LerpDuration">The duration, in seconds, over which to interpolate the parameter value</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ModulateAudioTrackEffectParameter(URCAudioTrackBase* Track, FName ParamName, float TargetValue, float LerpDuration);

	/// <summary>
	/// Retrieves the names of effect parameters for a given audio track.
	/// </summary>
	/// <param name="Track">A pointer to the audio track from which to retrieve effect parameter names</param>
	/// <returns>An array of FName objects representing the names of the effect parameters for the specified audio track</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<FName> GetAudioTrackEffectParameterNames(URCAudioTrackBase* Track);

	/// SECTION 6 | Sends API ------------------------------------------------------------------------------------------------------------------------------------------------
	/*
		The Audio Sends API offers the ability to route audio from any Music/Game derived audio channel to a designated Send channel, used for parallel sound processing and "side-chaining" audio processes.
		- You create a Send Destination Target
		- You StartSend audio to that target from a source channel
		- You then get a "SendControl" channel that lives under that Destination Target, which you can use for specifically processing that sent audio data
		- Finally can apply audio processing on the entire send Destination Target, affecting all incoming sends that live under it

		NOTE: EXPERIMENTAL FEATURE - currently noticeable latency is observed when using Send channels (can vary due to hardware)
	*/

	/// <summary>
	/// Retrieves the root send audio channel for the specified audio domain.
	/// </summary>
	/// <param name="AudioDomain">The audio domain for which to get the root send audio channel (Music / Game)</param>
	/// <returns>A pointer to the root send audio channel associated with the given audio domain</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetRootSendAudioChannel(ERCAudioDomain AudioDomain);

	/// <summary>
	/// Get the Send destination channels listed under a particular domain
	/// </summary>
	/// <param name="AudioDomain">The audio domain for which to get the target channels</param>
	/// <returns>An array of  target channels for the specified audio domain</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<URCAudioChannelBase*> GetSendDestinationTargetChannels(ERCAudioDomain AudioDomain);

	/// <summary>
	/// Retrieves the target Send audio channel within the specified domain, and target channel name
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which to search for the target channel</param>
	/// <param name="SendDestinationTargetChannelName">The name of the destination target audio channel</param>
	/// <returns>A Send audio channel, or nullptr if not found.</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetSendAudioChannelTarget(ERCAudioDomain AudioDomain, FName SendDestinationTargetChannelName);

	/// <summary>
	/// Adds a new send destination target channel to the specified audio domain
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which to add the new send destination target</param>
	/// <param name="NewSendDestinationName">The name of the new send channel to create</param>
	/// <returns>A pointer to the newly created URCAudioChannelBase representing the send destination target</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* AddNewSendDestinationTarget(ERCAudioDomain AudioDomain, FName NewSendDestinationName);

	/// <summary>
	/// Removes a send destination target channel from the specified audio domain.
	/// </summary>
	/// <param name="AudioDomain">The audio domain from which to remove the destination target channel.</param>
	/// <param name="DestinationTargetChannelToRemove">The name of the destination target channel to be removed.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveSendDestinationTarget(ERCAudioDomain AudioDomain, FName DestinationTargetChannelToRemove);

	/// <summary>
	/// Starts sending audio from a source channel to a specified destination target
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which the send destination exists</param>
	/// <param name="DestinationTargetSendChannel">The name of the destination target channel to which audio will be sent</param>
	/// <param name="SendingSourceChannel">A pointer to the source audio channel that will send audio to the destination</param>
	/// <returns>A pointer to the SendController audio channel. This is the channel you want to control the Gain or apply Effects to</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* StartSendChannelToDestinationTarget(ERCAudioDomain AudioDomain, FName DestinationTargetSendChannel, URCAudioChannelBase* SendingSourceChannel);

	/// <summary>
	/// Activates or deactivates a send source for a specified audio domain and destination channel
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which the send destination target exists</param>
	/// <param name="DestinationTargetSendChannel">The name of the destination target send channel.</param>
	/// <param name="SendingSourceChannel">Pointer to the source audio channel that sends the audio (the `Sender` channel)</param>
	/// <param name="bActive">Whether to activate (true) or deactivate (false) the send through</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetSendSourceActive(ERCAudioDomain AudioDomain, FName DestinationTargetSendChannel, URCAudioChannelBase* SendingSourceChannel, bool bActive);

	/// <summary>
	/// Stops sending audio from a source channel to a specified target send channel within a given audio domain.
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which the send destination target exists</param>
	/// <param name="DestinationTargetSendChannel">The name of the target send channel to which audio is being sent.</param>
	/// <param name="SendingSourceChannel">A pointer to the source audio channel that is currently sending audio</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void StopSendAudioToTarget(ERCAudioDomain AudioDomain, FName DestinationTargetSendChannel, URCAudioChannelBase* SendingSourceChannel);

	/// <summary>
	/// Get all the incoming "transmitting" channels ("senders") that feed audio to the given destination SendChannel
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which the send destination target exists</param>
	/// <param name="DestinationTargetSendChannel">The Send destination group to get all sources for</param>
	/// <returns>An array of all the incoming source channels that feed audio into this Send</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<URCAudioChannelBase*> GetSendSourcesForDestinationTarget(ERCAudioDomain AudioDomain, FName DestinationTargetSendChannel);

	/// <summary>
	/// Get all the SendController channels that control each corresponding incoming source into given the destination SendChannel. A controller channel is the actual channel you want to directly manipulate with effects and audio processing for the given source feed
	/// </summary>
	/// <param name="AudioDomain">The audio domain in which the send destination target exists</param>
	/// <param name="DestinationTargetSendChannel">The Send destination group to get all controllers for</param>
	/// <returns>An array of all the controllers</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<URCAudioChannelBase*> GetSendControllersForDestinationTarget(ERCAudioDomain AudioDomain, FName DestinationTargetSendChannel);

	///  SECTION 7 | Soloing functionality ----------------------------------------------------------------------------------------------------------------------------------
	/*
		Simple API for controlling the Soloing in and out of audio channels and audio tracks.

		NOTE: GameAudio soloing is currently unsupported - only music domain channels and tracks
	*/

	// channel soloing

	/// <summary>
	/// Checks if channel soloing is currently active.
	/// </summary>
	/// <returns>True if channel soloing is active; otherwise, false.</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static bool GetChannelSoloingActive();

	/// <summary>
	/// Sets the soloing state for AudioChannels in the Realtime Composer system. If true and there are any channels added to the ChannelsSoloList, they will be played soloed
	/// </summary>
	/// <param name="bSoloingActive">True to activate soloing for the channel; false to deactivate.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetChannelSoloingActive(bool bSoloingActive);

	/// <summary>
	/// Adds the specified audio channel to the solo list.
	/// </summary>
	/// <param name="Channel">A pointer to the audio channel to add to the solo list.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void AddChannelToSoloList(URCAudioChannelBase* Channel);

	/// <summary>
	/// Removes the specified audio channel from the solo list.
	/// </summary>
	/// <param name="Channel">A pointer to the audio channel to remove from the solo list.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveChannelFromSoloList(URCAudioChannelBase* Channel);

	/// <summary>
	/// Clears the list of solo channels in the Realtime Composer system.
	/// </summary>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ClearSoloChannelsList();

	// track soloing

	/// <summary>
	/// Checks if track soloing is currently active.
	/// </summary>
	/// <returns>True if track soloing is active; otherwise, false.</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static bool GetTrackSoloingActive();

	/// <summary>
	/// Sets the soloing state for track playback in the Realtime Composer system.  If true and there are any tracks added to the TracksSoloList, they will be played soloed
	/// </summary>
	/// <param name="bSoloingActive">True to activate soloing mode for tracks; false to deactivate.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void SetTrackSoloingActive(bool bSoloingActive);

	/// <summary>
	/// Adds the specified audio track to the solo list.
	/// </summary>
	/// <param name="Track">A pointer to the audio track to add to the solo list.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void AddTrackToSoloList(URCAudioTrackBase* Track);

	/// <summary>
	/// Removes the specified audio track from the solo list in the Realtime Composer system.
	/// </summary>
	/// <param name="Track">A pointer to the audio track to be removed from the solo list.</param>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void RemoveTrackFromSoloList(URCAudioTrackBase* Track);

	/// <summary>
	/// Clears the list of solo tracks in the Realtime Composer system.
	/// </summary>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static void ClearSoloTracksList();

	
	/// SECTION 7 | RC Runtime Data Getters ----------------------------------------------------------------------------------------------------------------------------------
	/*
		A data-fetch API meant for getting runtime data about the system.
		Here are functions defined for getting musical states, audio channels, tracks, time in float to a musical cue, and more.
	*/

	/// <summary>
	/// Utility to get the time remainder to the specified quantization type while clock is playing
	/// </summary>
	/// <param name="Quantization">The quantization type</param>
	/// <param name="Multiplier">The multiplier applied on the quantization type before calculation</param>
	/// <returns>Time in seconds for the next occurence of the specified quantization type</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static float GetScheduleTimeForQuantizationType(EQuartzCommandQuantization Quantization, float Multiplier = 1.0f);

	/// <summary>
	/// Get the time the the next Loop
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static float GetTimeToNextLoop(); 

	/// <summary>
	/// Get the time the the next Bar
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static float GetTimeToNextBar(); 

	/// <summary>
	/// Get the time the the next Beat
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static float GetTimeToNextBeat(); 

	/// <summary>
	/// Get the Master RCAudioChannel (direct child of the UE audio engine Master Submix)
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetRCMasterAudioChannel();

	/// <summary>
	/// Get the RootMusicAudioChannel  (the direct parent of all MusicalStates)
	/// </summary>
	/// <returns>The RC.Master.MusicAudioMasterChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetRCRootMusicAudioChannel();

	/// <summary>
	/// Get the RootGameAudioChannel  (the direct parent of all GameAudio MixGroups)
	/// </summary>
	/// <returns>The RC.Master.GameAudioMasterChannel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetRCRootGameAudioChannel();

	/// <summary>
	/// Returns the number of escalation factors present in the active musical state. If no active musical state returns 0
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static int32 GetActiveMusicStateMaxEscalationFactor();

	/// <summary>
	/// Get the first level children audio channels under a parent channel
	/// </summary>
	/// <param name="ParentChannel">The parent channel to search under</param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static const TArray<URCAudioChannelBase*> GetChildrenAudioChannels(URCAudioChannelBase* ParentChannel);

	/// <summary>
	/// Get all of the children audio channels under a parent channel, disregarding hierarchy, all returned as one array
	/// </summary>
	/// <param name="ParentChannel">The parent channel to search under</param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static const TArray<URCAudioChannelBase*> GetAllChildrenAudioChannelsBelow(URCAudioChannelBase* ParentChannel);

	

	/// <summary>
	/// Get a top-level GameAudio mix group channel
	/// NOTE: TO create a new game audio channel, call AddNewGameAudioMixGroup
	/// </summary>
	/// <param name="NewMixGroupName">The new channel group name</param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetGameAudioMixGroup(FName MixGroupName);

	/// <summary>
	/// Get a child audio channel of a top-level GameAudio mix group channel
	/// </summary>
	/// <param name="ParentMixGroup">The parent mix group channel</param>
	/// <param name="ChildMixGroupChannelName">The child channel name to search for</param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannelBase* GetGameAudioSubMixGroup(URCAudioChannelData* ParentMixGroup, FName ChildMixGroupChannelName);


	/// <summary>
	/// Get all Musical States
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TMap<FName, UMusicStateCollections*> GetMusicalStatesCollectionsContainer();

	/// <summary>
	/// Get a MusicalState by it's name
	/// </summary>
	/// <param name="MusicalStateName"></param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static UMusicStateCollections* GetMusicalStateCollection(FName MusicalStateName);

	/// <summary>
	/// Get currently active MusicalState (can be null if clock is not ticking)
	/// </summary>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static UMusicStateCollections* GetActiveMusicalState(); 

	/// <summary>
	/// Get the SubState-EscalationFactor AudioChannel under a MusicalState
	/// NOTE: The term `SubState-EscalationFactor` is simply another way of saying an audio channel group that is a part of the main `Music` collection
	/// </summary>
	/// <param name="OwningMusicalState">The MusicalState to search under</param>
	/// <param name="GroupName">The name of the escalation factor group</param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannel* GetEscalationFactorSubStateAudioChannel(UMusicStateCollections* OwningMusicalState, FName GroupName); 

	/// <summary>
	/// Get the AudioChannel group under a SubCollection of the MusicalState 
	/// NOTE: each MusicalState has a main `Music` collection, and 3 `Audio`, `Transients`, `Samples` sub-collections. Audio channels under a `Music` collection are referred to as SubStates or EscalationFactors, and audio channels under any of the other 3 sub-collections are referred to as SubCollectionGroups
	/// </summary>
	/// <param name="OwningMusicalState"></param>
	/// <param name="Context"></param>
	/// <param name="GroupName"></param>
	/// <returns></returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioChannel* GetSubCollectionGroupAudioChannel(UMusicStateCollections* OwningMusicalState, EAudioTrackGroupContext Context, FName GroupName); 

	/// <summary>
	/// Get all audio tracks that belong to an audio channel
	/// </summary>
	/// <param name="OwningChannel">The owning channel to get tracks from</param>
	/// <returns>All audio tracks contained in the channel</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static TArray<URCAudioTrackBase*> GetChannelAudioTracks(URCAudioChannelBase* OwningChannel);

	/// <summary>
	/// Get an audio track belonging to a channel
	/// </summary>
	/// <param name="OwningChannel">The owning channel to search in</param>
	/// <param name="TrackName">The track name to search for</param>
	/// <returns>The audio track if found, nullptr if not found</returns>
	UFUNCTION(BlueprintCallable, Category = "Realtime Composer")
	static URCAudioTrackBase* GetAudioTrack(URCAudioChannelBase* OwningChannel, FName TrackName);
};